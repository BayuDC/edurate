import { faker } from '@faker-js/faker';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import { DateTime } from 'luxon';

import User from '#models/user';
import Student from '#models/student';
import Profile from '#models/profile';
import Class from '#models/class';
import db from '@adonisjs/lucid/services/db';

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

    let ids = [];

    for (let i = 0; i < 60; i++) {
      const classId = parseInt(`${i / 15}`) + 1;

      ids.push({ student_id: i + 1, class_id: classId, period_id: 4 });
    }

    await db.table('student_classes').multiInsert(ids);
  }
}
