import vine from '@vinejs/vine';

const classValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    periodId: vine.number().positive(),
  })
);

export default classValidator;
