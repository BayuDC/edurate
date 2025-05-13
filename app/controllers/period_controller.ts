import { DateTime } from 'luxon';
import type { HttpContext } from '@adonisjs/core/http';

import Period from '#models/period';
import { createPeriodValidator, updatePeriodValidator } from '#validators/period_validator';

export default class PeriodController {
  async index({ response }: HttpContext) {
    response.send({
      periods: await Period.query().orderBy('start_date', 'desc'),
    });
  }

  async store({ request, response }: HttpContext) {
    const data = request.all();
    const payload = await createPeriodValidator.validate(data);

    try {
      const period = await Period.create({
        name: payload.name,
        startDate: DateTime.fromJSDate(payload.startDate),
        endDate: DateTime.fromJSDate(payload.endDate),
      });

      response.status(201).send({
        period,
      });
    } catch (error) {
      response.status(422).send({
        message: 'Failed to create period',
        error: error.message,
      });
    }
  }

  async show({ params, response }: HttpContext) {
    const period = await Period.find(params.id);

    if (!period) {
      response.status(404).send({
        message: 'Period not found',
      });
      return;
    }

    response.send({
      period,
    });
  }

  async update({ params, request, response }: HttpContext) {
    const period = await Period.find(params.id);

    if (!period) {
      response.status(404).send({
        message: 'Period not found',
      });
      return;
    }

    const data = request.all();
    const payload = await updatePeriodValidator.validate(data);

    try {
      if (payload.name) period.name = payload.name;
      if (payload.startDate) period.startDate = DateTime.fromJSDate(payload.startDate);
      if (payload.endDate) period.endDate = DateTime.fromJSDate(payload.endDate);

      if (period.startDate >= period.endDate) {
        response.status(422).send({
          errors: [
            {
              message: 'The startDate field must be a date before endDate',
              rule: 'date.beforeField',
              field: 'startDate',
            },
            {
              message: 'The endDate field must be a date after startDate',
              rule: 'date.afterField',
              field: 'endDate',
            },
          ],
        });
        return;
      }

      await period.save();

      response.status(200).send({ period });
    } catch (error) {
      response.status(422).send({
        message: 'Failed to update period',
        error: error.message,
      });
    }
  }

  async destroy({ params, response }: HttpContext) {
    const period = await Period.find(params.id);

    if (!period) {
      response.status(404).send({
        message: 'Period not found',
      });
      return;
    }

    try {
      await period.delete();
      response.status(204);
    } catch (error) {
      response.status(422).send({
        message: 'Failed to delete period',
        error: error.message,
      });
      return;
    }
  }
}
