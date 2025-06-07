import type { HttpContext } from '@adonisjs/core/http';
import { DateTime } from 'luxon';

import User from '#models/user';
import Profile from '#models/profile';

import { updateProfileValidator, updateSecurityValidator } from '#validators/profile_validator';

export default class ProfileController {
  async index({ auth, response }: HttpContext) {
    const user = auth.user!;

    let profile = await Profile.find(user.id);

    if (!profile) {
      profile = await Profile.create({
        userId: user.id,
      });
    }

    return response.ok({
      profile,
    });
  }

  async update({ auth, request, response }: HttpContext) {
    const user = auth.user!;

    try {
      const data = await request.validateUsing(updateProfileValidator);

      let profile = await Profile.find(user.id);

      if (!profile) {
        profile = new Profile();
        profile.userId = user.id;
      }

      profile.address = data.address || profile.address;
      profile.gender = data.gender || profile.gender;
      profile.birthDate = data.birthDate ? DateTime.fromJSDate(data.birthDate) : profile.birthDate;
      profile.birthPlace = data.birthPlace || profile.birthPlace;
      profile.phone = data.phone || profile.phone;

      await profile.save();

      return response.ok({
        message: 'Profile updated successfully',
        profile,
      });
    } catch (error) {
      return response.badRequest({
        message: 'Validation failed',
        errors: error.messages || error.message,
      });
    }
  }

  async updateSecurity({ auth, request, response }: HttpContext) {
    const user = auth.user!;
    const body = request.body();
    const data = await updateSecurityValidator.validate(body, {
      meta: { userId: user.id },
    });

    try {
      user.password = data.password;
      await user.save();

      return response.ok({
        message: 'Password updated successfully',
      });
    } catch (error) {
      return response.badRequest({
        message: 'Password update failed',
        error: error.message,
      });
    }
  }
}
