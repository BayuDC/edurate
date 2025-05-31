import { faker } from '@faker-js/faker';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import { DateTime } from 'luxon';

import User from '#models/user';
import Teacher from '#models/teacher';
import Profile from '#models/profile';

export default class extends BaseSeeder {
  async run() {
    const numbers = Array.from(Array(20)).map((_, i) => ('0' + (i + 1)).slice(-2));

    const users = await User.createMany(
      numbers.map((number) => {
        return {
          username: `dsn${number}`,
          password: `dsn${number}`,
          email: `dsn${number}@kampus.local`,
          role: 'teacher' as 'teacher',
        };
      })
    );

    const teachers = await Teacher.createMany(
      users.map((user, i) => ({
        userId: user.id,
        code: user.username.toUpperCase(),
        name: faker.person.fullName(),
      }))
    );

    const profiles = await Profile.createMany(
      users.map((user, i) => ({
        userId: user.id,
        address: faker.location.streetAddress(),
        birthDate: DateTime.fromJSDate(faker.date.birthdate()),
        birthPlace: faker.location.city(),
        gender: faker.helpers.arrayElement(['Male', 'Female']),
        phone: faker.phone.number(),
      }))
    );
  }
}
