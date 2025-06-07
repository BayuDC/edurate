import vine from '@vinejs/vine';

export const updateProfileValidator = vine.compile(
  vine.object({
    address: vine.string().optional(),
    gender: vine.enum(['Male', 'Female']).optional(),
    birthDate: vine.date().optional(),
    birthPlace: vine.string().optional(),
    phone: vine.string().optional(),
  })
);
