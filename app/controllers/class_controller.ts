import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

import {
  createClassValidator,
  enrollStudentValidator,
  unenrollStudentValidator,
} from '#validators/class_validator';

import Class from '#models/class';
import Period from '#models/period';
import Student from '#models/student';
import { UtilService } from '#services/util_service';

@inject()
export default class ClassController {
  constructor(protected util: UtilService) {}

  async index({ request, response }: HttpContext) {
    const classes = await Class.query().orderBy('name', 'asc');

    response.send({
      classes,
    });
  }

  async show({ request, response }: HttpContext) {
    const classInstance = await Class.find(request.param('id'));
    if (!classInstance) {
      return response.status(404).send({
        message: 'Class not found',
      });
    }

    response.send({
      class: classInstance,
    });
  }

  async store({ params, request, response }: HttpContext) {
    const body = request.body();
    const data = await createClassValidator.validate(body);

    try {
      const classInstance = await Class.create({
        name: data.name,
      });

      response.status(201).send({
        class: classInstance,
      });
    } catch (error) {
      response.status(500).send({
        message: 'Failed to create class',
        error: error.message,
      });
    }
  }

  async update({ params, request, response }: HttpContext) {
    const classInstance = await Class.find(params.id);
    if (!classInstance) {
      return response.status(404).send({
        message: 'Class not found',
      });
    }

    const body = request.body();
    const data = await createClassValidator.validate(body);

    try {
      classInstance.name = data.name;
      await classInstance.save();

      response.send({
        class: classInstance,
      });
    } catch (error) {
      response.status(500).send({
        message: 'Failed to update class',
        error: error.message,
      });
    }
  }

  async destroy({ params, request, response }: HttpContext) {
    const classInstance = await Class.find(params.id);
    if (!classInstance) {
      return response.status(404).send({
        message: 'Class not found',
      });
    }

    try {
      await classInstance.delete();
      response.status(204);
    } catch (error) {
      response.status(500).send({
        message: 'Failed to delete class',
        error: error.message,
      });
    }
  }

  // !
  async listStudents({ params, request, response }: HttpContext) {
    const period = await this.util.getActivePeriod();

    const cls = await Class.find(request.param('id'));
    if (!cls) {
      return response.notFound({
        message: 'Class not found',
      });
    }

    await cls.load('students', (query) => {
      query.wherePivot('period_id', period.id);
    });

    return response.ok({
      class: cls,
    });
  }

  public async storeStudent({ params, request, response }: HttpContext) {
    const period = await this.util.getActivePeriod();
    const cls = await Class.find(request.param('id'));
    if (!cls) {
      return response.notFound({
        message: 'Class not found',
      });
    }

    const body = request.body();
    const data = await enrollStudentValidator.validate(body, {
      meta: { period: period.id, classId: cls.id },
    });

    try {
      await cls.related('students').attach({
        [data.studentId]: {
          period_id: period.id,
        },
      });

      return response.created({
        message: 'Student enrolled successfully',
      });
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to enroll student',
        error: error.message,
      });
    }
  }
  public async removeStudent({ params, request, response }: HttpContext) {
    const period = await this.util.getActivePeriod();
    const cls = await Class.find(request.param('id'));
    if (!cls) {
      return response.notFound({
        message: 'Class not found',
      });
    }

    const body = request.body();
    const data = await unenrollStudentValidator.validate(body, {
      meta: { periodId: period.id, classId: cls.id },
    });
    try {
      await cls.related('students').detach([data.studentId]);

      return response.noContent();
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to unenroll student',
        error: error.message,
      });
    }
  }
}
