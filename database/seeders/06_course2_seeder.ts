import { BaseSeeder } from '@adonisjs/lucid/seeders';

import Course from '#models/course';
import Class from '#models/class';
import Student from '#models/student';
import db from '@adonisjs/lucid/services/db';

export default class extends BaseSeeder {
  async run() {
    let c1 = [];
    let c2 = [];
    let c3 = [];
    let c4 = [];

    for (let i = 0; i < 60; i++) {
      const classId = parseInt(`${i / 15}`) + 1;
      if (classId == 1) {
        c1.push({ student_id: i + 1, period_id: 4 });
      } else if (classId == 2) {
        c2.push({ student_id: i + 1, period_id: 4 });
      } else if (classId == 3) {
        c3.push({ student_id: i + 1, period_id: 4 });
      } else if (classId == 4) {
        c4.push({ student_id: i + 1, period_id: 4 });
      }
    }

    await db.table('student_courses').multiInsert(
      c1.map((item) => ({
        student_id: item.student_id,
        course_id: 1,
        period_id: item.period_id,
        teacher_id: 1,
      }))
    );
    await db.table('student_courses').multiInsert(
      c1.map((item) => ({
        student_id: item.student_id,
        course_id: 2,
        period_id: item.period_id,
        teacher_id: 2,
      }))
    );

    await db.table('student_courses').multiInsert(
      c2.slice(0, 8).map((item) => ({
        student_id: item.student_id,
        course_id: 1,
        period_id: item.period_id,
        teacher_id: 1,
      }))
    );
  }
}
