import vine from '@vinejs/vine';
import hash from '@adonisjs/core/services/hash';
import User from '#models/user';

export const updateProfileValidator = vine.compile(
  vine.object({
    address: vine.string().optional(),
    gender: vine.enum(['Male', 'Female']).optional(),
    birthDate: vine.date().optional(),
    birthPlace: vine.string().optional(),
    phone: vine.string().optional(),
  })
);

export const updateSecurityValidator = vine.withMetaData<{ userId: number }>().compile(
  vine.object({
    passwordCurrent: vine
      .string()
      .minLength(6)
      .exists(async (db, value, field) => {
        const user = await User.find(field.meta.userId);

        if (!user) {
          return false;
        }

        const isValid = await hash.verify(user.password, value);
        return isValid;
      }),
    password: vine.string().minLength(6).confirmed({ confirmationField: 'passwordConfirm' }),
    passwordConfirm: vine.string(),
  })
);
