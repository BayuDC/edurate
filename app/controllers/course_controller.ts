import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import Course from '#models/course';
import Student from '#models/student';
import { createCourseValidator, updateCourseValidator } from '#validators/course_validator';
import { UtilService } from '#services/util_service';
import db from '@adonisjs/lucid/services/db';
import Class from '#models/class';

@inject()
export default class CourseController {
  constructor(protected util: UtilService) {}

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

  // !

  public async listStudents({ request, response, params }: HttpContext) {
    const { limit, page, available, classId } = request.qs();
    const course = await Course.find(params.id);
    const period = await this.util.getActivePeriod();

    if (!classId || !(await Class.find(classId))) {
      return response.status(400).json({
        message: 'Class ID is required',
      });
    }

    if (!course) {
      return response.status(404).json({
        message: 'Course not found',
      });
    }

    try {
      if (available) {
        const ids = (
          await db
            .from('student_courses')
            .select('student_id')
            .where('course_id', params.id)
            .where('period_id', period.id)
        ).map((row) => row.student_id);

        const query = await db
          .from('students')
          .join('student_classes', 'students.id', 'student_classes.student_id')
          .join('classes', 'student_classes.class_id', 'classes.id')
          .whereNotIn('students.id', ids)
          .where('student_classes.class_id', classId)
          .where('student_classes.period_id', period.id)
          .select(
            'students.id',
            'students.name',
            'students.code',
            'classes.name as className',
            'students.created_at as createdAt',
            'students.updated_at as updatedAt'
          )
          .orderBy('students.code', 'asc')
          .paginate(page, limit || 10);

        return response.json({
          meta: query.getMeta(),
          students: query.all(),
        });
      }

      const query = await db
        .from('students')
        .join('student_courses', 'students.id', 'student_courses.student_id')
        .join('teachers', 'student_courses.teacher_id', 'teachers.id')
        .join('student_classes', function () {
          this.on('students.id', 'student_classes.student_id').andOn(
            'student_classes.period_id',
            'student_courses.period_id'
          );
        })
        .join('classes', 'student_classes.class_id', 'classes.id')
        .where('student_courses.course_id', params.id)
        .where('student_courses.period_id', period.id)
        .where('student_classes.class_id', classId)
        .select(
          'students.id',
          'students.name',
          'students.code',
          'student_courses.teacher_id as teacherId',
          'teachers.name as teacherName',
          'classes.name as className',
          'students.created_at as createdAt',
          'students.updated_at as updatedAt'
        )
        .orderBy('students.code', 'asc')
        .paginate(page, limit || 10);

      return response.json({
        meta: query.getMeta(),
        students: query.all(),
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Failed to list students',
        errors: error.message,
      });
    }
  }
}
