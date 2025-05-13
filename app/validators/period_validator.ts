import vine from '@vinejs/vine';

export const createPeriodValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    startDate: vine.date({ formats: ['YYYY-MM-DD'] }).beforeField('endDate'),
    endDate: vine.date({ formats: ['YYYY-MM-DD'] }).afterField('startDate'),
  })
);
export const updatePeriodValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
    startDate: vine
      .date({ formats: ['YYYY-MM-DD'] })
      .beforeField('endDate')
      .optional(),
    endDate: vine
      .date({ formats: ['YYYY-MM-DD'] })
      .afterField('startDate')
      .optional(),
  })
);
