import { DateTime } from 'luxon';
import type { HttpContext } from '@adonisjs/core/http';

import User from '#models/user';
import Teacher from '#models/teacher';

import { createTeacherValidator, updateTeacherValidator } from '#validators/teacher_validator';

export default class TeacherController {
  public async index({ request }: HttpContext) {
    const { page, limit } = request.qs();

    const teachers = (
      await Teacher.query()
        .orderBy('code', 'asc')
        .paginate(page, limit || 10)
    ).serialize();

    return {
      meta: teachers.meta,
      teachers: teachers.data,
    };
  }

  public async show({ params, response }: HttpContext) {
    const teacher = await Teacher.find(params.id);

    if (!teacher) {
      return response.notFound({
        message: 'Teacher not found',
      });
    }

    await teacher.load('profile');

    return response.ok({
      teacher,
    });
  }

  public async store({ request, response }: HttpContext) {
    const body = request.body();
    const data = await createTeacherValidator.validate(body);

    try {
      const user = await User.create({
        username: data.code.toLowerCase(),
        password: data.code.toLowerCase(),
        email: data.code.toLowerCase() + '@edurate.app',
        role: 'teacher',
      });

      const teacher = await Teacher.create({
        name: data.name,
        code: data.code,
        userId: user.id,
      });

      const profile = await teacher.related('profile').create({
        userId: user.id,
        address: data.address,
        gender: data.gender,
        birthDate: data.birthDate ? DateTime.fromJSDate(data.birthDate) : undefined,
        birthPlace: data.birthPlace,
        phone: data.phone,
      });

      await teacher.load('profile');

      return response.created({
        user,
        teacher,
      });
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to create teacher',
        error: error.message,
      });
    }
  }

  public async update({ params, request, response }: HttpContext) {
    const teacher = await Teacher.find(params.id);

    if (!teacher) {
      return response.notFound({
        message: 'Teacher not found',
      });
    }

    await teacher.load('profile');
    const profile = teacher.profile;

    const body = request.body();
    const data = await updateTeacherValidator.validate(body, {
      meta: { code: teacher.code },
    });

    try {
      teacher.merge({
        name: data.name,
        code: data.code,
      });
      await teacher.save();

      profile.merge({
        address: data.address || profile.address,
        gender: data.gender || profile.gender,
        birthDate: data.birthDate ? DateTime.fromJSDate(data.birthDate) : profile.birthDate,
        birthPlace: data.birthPlace || profile.birthPlace,
        phone: data.phone || profile.phone,
      });
      await profile.save();

      return response.ok({
        teacher,
      });
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to update teacher',
        error: error.message,
      });
    }
  }

  public async destroy({ params, response }: HttpContext) {
    const teacher = await Teacher.find(params.id);

    if (!teacher) {
      return response.notFound({
        message: 'Teacher not found',
      });
    }

    await teacher.delete();
    await User.query().where('id', teacher.userId).delete();

    return response.noContent();
  }
}
