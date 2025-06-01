import { DateTime } from 'luxon';
import type { HttpContext } from '@adonisjs/core/http';

import User from '#models/user';
import Student from '#models/student';

import { createStudentValidator, updateStudentValidator } from '#validators/student_validator';
import { inject } from '@adonisjs/core';
import { UtilService } from '#services/util_service';

export default class StudentsController {
  public async index({ request }: HttpContext) {
    const { page, limit } = request.qs();

    const students = (
      await Student.query()
        .orderBy('code', 'asc')
        .preload('profile')
        .paginate(page, limit || 10)
    ).serialize();

    return {
      meta: students.meta,
      students: students.data,
    };
  }

  public async show({ params, response, request }: HttpContext) {
    const student = await Student.find(params.id);

    if (!student) {
      return response.notFound({
        message: 'Student not found',
      });
    }

    await student.load('profile');

    return response.ok({
      student,
    });
  }

  public async store({ request, response }: HttpContext) {
    const body = request.body();
    const data = await createStudentValidator.validate(body);

    try {
      const user = await User.create({
        username: data.code.toLowerCase(),
        password: data.code.toLowerCase(),
        email: data.code.toLowerCase() + '@edurate.app',
        role: 'student',
      });

      const student = await Student.create({
        name: data.name,
        code: data.code,
        userId: user.id,
      });

      const profile = await student.related('profile').create({
        userId: user.id,
        address: data.address,
        gender: data.gender,
        birthDate: data.birthDate ? DateTime.fromJSDate(data.birthDate) : undefined,
        birthPlace: data.birthPlace,
        phone: data.phone,
      });

      await student.load('profile');

      return response.created({
        user,
        student,
      });
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to create student',
        error: error.message,
      });
    }
  }

  public async update({ params, request, response }: HttpContext) {
    const student = await Student.find(params.id);

    if (!student) {
      return response.notFound({
        message: 'Student not found',
      });
    }
    await student.load('profile');
    const profile = student.profile;

    const body = request.body();
    const data = await updateStudentValidator.validate(body, {
      meta: { code: student.code },
    });

    try {
      student.merge({
        name: data.name,
        code: data.code,
      });
      await student.save();

      profile.merge({
        address: data.address || profile.address,
        gender: data.gender || profile.gender,
        birthDate: data.birthDate ? DateTime.fromJSDate(data.birthDate) : profile.birthDate,
        birthPlace: data.birthPlace || profile.birthPlace,
        phone: data.phone || profile.phone,
      });
      await profile.save();

      return response.ok({
        student,
      });
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to update student',
        error: error.message,
      });
    }
  }

  public async destroy({ params, response }: HttpContext) {
    const student = await Student.find(params.id);

    if (!student) {
      return response.notFound({
        message: 'Student not found',
      });
    }

    await student.delete();
    await User.query().where('id', student.userId).delete();

    return response.noContent();
  }

  @inject()
  public async available({ request, response }: HttpContext, util: UtilService) {
    const period = await util.getActivePeriod();
    const { page, limit } = request.qs();

    const students = (
      await Student.query()
        .whereDoesntHave('classes', (query) => {
          query.where('period_id', period.id);
        })
        .orderBy('code', 'asc')
        .paginate(page, limit || 10)
    ).serialize();

    return response.ok({
      students: students.data,
      meta: students.meta,
    });
  }
}
