import { BaseSeeder } from '@adonisjs/lucid/seeders';

import Course from '#models/course';
import Class from '#models/class';
import Student from '#models/student';
import db from '@adonisjs/lucid/services/db';

export default class extends BaseSeeder {
  async run() {
    // class A
    const course1 = await Course.query().where('id', 1).first();
    const course2 = await Course.query().where('id', 2).first();
    const class1 = await Class.query().where('id', 1).first();
    const class2 = await Class.query().where('id', 2).first();
    if (!class1 || !class2) return;

    await class1?.load('students');
    await class2?.load('students');

    await course1?.related('students').attach({
      [class1.students[0].id]: { period_id: 4, teacher_id: 1 },
      [class1.students[1].id]: { period_id: 4, teacher_id: 1 },
      [class1.students[2].id]: { period_id: 4, teacher_id: 1 },
      [class1.students[3].id]: { period_id: 4, teacher_id: 1 },
      [class1.students[4].id]: { period_id: 4, teacher_id: 1 },
      [class1.students[5].id]: { period_id: 4, teacher_id: 1 },
      [class1.students[6].id]: { period_id: 4, teacher_id: 1 },
      [class1.students[7].id]: { period_id: 4, teacher_id: 1 },
      [class1.students[8].id]: { period_id: 4, teacher_id: 1 },
      [class1.students[9].id]: { period_id: 4, teacher_id: 1 },
      [class2.students[0].id]: { period_id: 4, teacher_id: 1 },
      [class2.students[1].id]: { period_id: 4, teacher_id: 1 },
      [class2.students[2].id]: { period_id: 4, teacher_id: 1 },
      [class2.students[3].id]: { period_id: 4, teacher_id: 1 },
      [class2.students[4].id]: { period_id: 4, teacher_id: 1 },
      [class2.students[5].id]: { period_id: 4, teacher_id: 1 },
      [class2.students[6].id]: { period_id: 4, teacher_id: 1 },
      [class2.students[7].id]: { period_id: 4, teacher_id: 1 },
      [class2.students[8].id]: { period_id: 4, teacher_id: 1 },
      [class2.students[9].id]: { period_id: 4, teacher_id: 1 },
    });
    await course2?.related('students').attach({
      [class1.students[0].id]: { period_id: 4, teacher_id: 2 },
      [class1.students[1].id]: { period_id: 4, teacher_id: 2 },
      [class1.students[2].id]: { period_id: 4, teacher_id: 2 },
      [class1.students[3].id]: { period_id: 4, teacher_id: 2 },
      [class1.students[4].id]: { period_id: 4, teacher_id: 2 },
      [class1.students[5].id]: { period_id: 4, teacher_id: 2 },
      [class1.students[6].id]: { period_id: 4, teacher_id: 2 },
      [class1.students[7].id]: { period_id: 4, teacher_id: 2 },
      [class1.students[8].id]: { period_id: 4, teacher_id: 2 },
      [class1.students[9].id]: { period_id: 4, teacher_id: 2 },
    });

    // await db.table('student_courses').insert({
    //   student_id: 20,
    //   course_id: 2,
    //   period_id: 4,
    //   teacher_id: 10,
    // });
  }
}
