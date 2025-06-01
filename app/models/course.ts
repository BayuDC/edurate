import { DateTime } from 'luxon';
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm';
import type { HasOne, ManyToMany } from '@adonisjs/lucid/types/relations';

import Student from '#models/student';

export default class Course extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare code: string;

  @column()
  declare description?: string;

  @manyToMany(() => Student, {
    pivotTable: 'student_courses',
    pivotColumns: ['period_id', 'teacher_id'],
  })
  declare students: ManyToMany<typeof Student>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
