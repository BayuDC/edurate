import vine from '@vinejs/vine';

export const createClassValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
  })
);

export const enrollStudentValidator = vine.compile(
  vine.object({
    studentId: vine
      .number()
      .positive()
      .exists(async (db, value, field) => {
        const student = await db.from('students').where('id', value).first();

        return !!student;
      })
      .unique(async (db, value, field) => {
        console.log(field);
        const exists = await db
          .from('student_classes')
          .where('student_id', value)
          .andWhere('class_id', field.meta.classId)
          .andWhere('period_id', field.meta.periodId)
          .first();

        return !exists;
      }),
  })
);

export const unenrollStudentValidator = vine.compile(
  vine.object({
    studentId: vine
      .number()
      .positive()
      .exists(async (db, value, field) => {
        const student = await db.from('students').where('id', value).first();
        const exists = await db
          .from('student_classes')
          .where('student_id', value)
          .andWhere('class_id', field.meta.classId)
          .andWhere('period_id', field.meta.periodId)
          .first();

        return !!student && !!exists;
      }),
  })
);
