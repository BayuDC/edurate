import vine from '@vinejs/vine';

export const createCourseValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    code: vine.string().trim().unique({
      table: 'courses',
      column: 'code',
    }),
    description: vine.string().trim().optional(),
  })
);

export const updateCourseValidator = vine.withMetaData<{ code: string }>().compile(
  vine.object({
    name: vine.string().trim(),
    code: vine
      .string()
      .trim()
      .unique(async (db, value, field) => {
        const course = await db
          .from('courses')
          .andWhereNot('code', field.meta.code)
          .where('code', value)
          .first();

        return !course;
      }),
    description: vine.string().trim().optional(),
  })
);

export const enrollStudentValidator = vine.compile(
  vine.object({
    studentId: vine
      .number()
      .positive()
      .exists(async (db, value) => {
        const student = await db.from('students').where('id', value).first();
        return !!student;
      })
      .unique(async (db, value, field) => {
        const exists = await db
          .from('student_courses')
          .where('student_id', value)
          .andWhere('course_id', field.meta.courseId)
          .first();

        return !exists;
      }),

    teacherId: vine
      .number()
      .positive()
      .exists(async (db, value) => {
        const teacher = await db.from('teachers').where('id', value).first();
        return !!teacher;
      }),
  })
);

export const unenrollStudentValidator = vine.compile(
  vine.object({
    studentId: vine
      .number()
      .positive()
      .exists(async (db, value) => {
        const student = await db.from('students').where('id', value).first();
        return !!student;
      })
      .unique(async (db, value, field) => {
        const exists = await db
          .from('student_courses')
          .where('student_id', value)
          .andWhere('course_id', field.meta.courseId)
          .first();

        return !!exists;
      }),
  })
);
