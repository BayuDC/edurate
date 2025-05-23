import vine from '@vinejs/vine';

export const createStudentValidator = vine.compile(
  vine.object({
    name: vine.string(),
    code: vine.string().startsWith('MHS').trim().unique({
      table: 'students',
      column: 'code',
    }),
    address: vine.string().optional(),
    gender: vine.enum(['Male', 'Female']).optional(),
    birthDate: vine.date().optional(),
    birthPlace: vine.string().optional(),
    phone: vine.string().optional(),
  })
);
export const updateStudentValidator = vine.compile(
  vine.object({
    name: vine.string(),
    code: vine
      .string()
      .startsWith('MHS')
      .trim()
      .unique(async (db, value, field) => {
        const student = await db
          .from('students')
          .andWhereNot('code', field.meta.code)
          .where('code', value)
          .first();

        return !student;
      }),
    address: vine.string().optional(),
    gender: vine.enum(['Male', 'Female']).optional(),
    birthDate: vine.date().optional(),
    birthPlace: vine.string().optional(),
    phone: vine.string().optional(),
  })
);
