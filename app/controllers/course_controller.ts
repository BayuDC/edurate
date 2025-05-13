import type { HttpContext } from '@adonisjs/core/http';
import Course from '#models/course';
import { createCourseValidator, updateCourseValidator } from '#validators/course_validator';

export default class CourseController {
  async index({ request, response }: HttpContext) {
    const courses = await Course.query().orderBy('code', 'asc');
    response.json({
      courses,
    });
  }

  async show({ request, response, params }: HttpContext) {
    const course = await Course.find(params.id);

    if (!course) {
      return response.status(404).json({
        message: 'Course not found',
      });
    }

    response.json({
      course,
    });
  }

  async store({ request, response }: HttpContext) {
    const body = request.body();
    const data = await createCourseValidator.validate(body);

    try {
      const course = await Course.create(data);

      response.status(201).json({
        course,
      });
    } catch (error) {
      response.status(500).json({
        message: 'Failed to create course',
        errors: error.messages,
      });
    }
  }

  async update({ request, response, params }: HttpContext) {
    const course = await Course.find(params.id);

    if (!course) {
      return response.status(404).json({
        message: 'Course not found',
      });
    }

    const body = request.body();
    const data = await updateCourseValidator.validate(body, {
      meta: { code: course.code },
    });

    try {
      course.merge(data);
      await course.save();

      response.status(200).json({
        course,
      });
    } catch (error) {
      response.status(500).json({
        message: 'Failed to update course',
        errors: error.messages,
      });
    }
  }

  async destroy({ request, response, params }: HttpContext) {
    const course = await Course.find(params.id);

    if (!course) {
      return response.status(404).json({
        message: 'Course not found',
      });
    }

    try {
      await course.delete();

      response.status(204);
    } catch (error) {
      response.status(500).json({
        message: 'Failed to delete course',
        errors: error.messages,
      });
    }
  }
}
