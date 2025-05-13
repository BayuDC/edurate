import type { HttpContext } from '@adonisjs/core/http';
import classValidator from '#validators/class_validator';

import Class from '#models/class';
import Period from '#models/period';

export default class ClassController {
  async index({ request, response }: HttpContext) {
    const classes = await Class.query().preload('period').orderBy('name', 'asc');

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

    await classInstance.load('period');
    response.send({
      class: classInstance,
    });
  }

  async store({ params, request, response }: HttpContext) {
    const body = request.body();
    const data = await classValidator.validate(body);

    const period = await Period.find(data.periodId);
    if (!period) {
      return response.status(422).send({
        errors: [
          {
            rule: 'exists',
            message: 'The period field must be exists',
            field: 'periodId',
          },
        ],
      });
    }

    try {
      const classInstance = await period.related('classes').create({
        name: data.name,
      });

      await classInstance.load('period');
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
    const data = await classValidator.validate(body);

    const period = await Period.find(data.periodId);
    if (!period) {
      return response.status(422).send({
        errors: [
          {
            rule: 'exists',
            message: 'The period field must be exists',
            field: 'periodId',
          },
        ],
      });
    }

    try {
      classInstance.name = data.name;
      classInstance.periodId = data.periodId;
      await classInstance.save();

      await classInstance.load('period');
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
}
