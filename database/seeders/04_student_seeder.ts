import { faker } from '@faker-js/faker';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import { DateTime } from 'luxon';

import User from '#models/user';
import Student from '#models/student';
import Profile from '#models/profile';
import Class from '#models/class';

export default class extends BaseSeeder {
  async run() {
    const numbers = Array.from(Array(80)).map((_, i) => ('0' + (i + 1)).slice(-2));

    const users = await User.createMany(
      numbers.map((number) => {
        return {
          username: `mhs${number}`,
          password: `mhs${number}`,
          email: `mhs${number}@kampus.local`,
          role: 'student' as 'student',
        };
      })
    );

    const students = await Student.createMany(
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

    const cls1 = await Class.query().where('id', 1).first();
    await cls1?.related('students').attach({
      [students[0].id]: { period_id: 4 },
      [students[1].id]: { period_id: 4 },
      [students[2].id]: { period_id: 4 },
      [students[3].id]: { period_id: 4 },
      [students[4].id]: { period_id: 4 },
      [students[5].id]: { period_id: 4 },
      [students[6].id]: { period_id: 4 },
      [students[7].id]: { period_id: 4 },
      [students[8].id]: { period_id: 4 },
      [students[9].id]: { period_id: 4 },
    });

    const cls2 = await Class.query().where('id', 2).first();
    await cls2?.related('students').attach({
      [students[10].id]: { period_id: 4 },
      [students[11].id]: { period_id: 4 },
      [students[12].id]: { period_id: 4 },
      [students[13].id]: { period_id: 4 },
      [students[14].id]: { period_id: 4 },
      [students[15].id]: { period_id: 4 },
      [students[16].id]: { period_id: 4 },
      [students[17].id]: { period_id: 4 },
      [students[18].id]: { period_id: 4 },
      [students[19].id]: { period_id: 4 },
    });
  }
}
