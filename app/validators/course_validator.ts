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
