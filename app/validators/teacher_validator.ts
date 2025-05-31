import vine from '@vinejs/vine';

export const createTeacherValidator = vine.compile(
  vine.object({
    name: vine.string(),
    code: vine.string().startsWith('DSN').trim().unique({
      table: 'teachers',
      column: 'code',
    }),
    address: vine.string().optional(),
    gender: vine.enum(['Male', 'Female']).optional(),
    birthDate: vine.date().optional(),
    birthPlace: vine.string().optional(),
    phone: vine.string().optional(),
  })
);

export const updateTeacherValidator = vine.compile(
  vine.object({
    name: vine.string(),
    code: vine
      .string()
      .startsWith('DSN')
      .trim()
      .unique(async (db, value, field) => {
        const teacher = await db
          .from('teachers')
          .andWhereNot('code', field.meta.code)
          .where('code', value)
          .first();

        return !teacher;
      }),
    address: vine.string().optional(),
    gender: vine.enum(['Male', 'Female']).optional(),
    birthDate: vine.date().optional(),
    birthPlace: vine.string().optional(),
    phone: vine.string().optional(),
  })
);
