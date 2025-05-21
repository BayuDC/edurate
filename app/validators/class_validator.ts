import vine from '@vinejs/vine';

const classValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
  })
);

export default classValidator;
