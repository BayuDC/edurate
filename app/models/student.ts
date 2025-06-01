import { DateTime } from 'luxon';
import { BaseModel, column, hasOne, manyToMany } from '@adonisjs/lucid/orm';
import type { HasOne, ManyToMany } from '@adonisjs/lucid/types/relations';

import User from '#models/user';
import Profile from '#models/profile';
import Course from '#models/course';
import Class from '#models/class';

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare code: string;

  @column()
  declare userId: number;

  @hasOne(() => User, {
    localKey: 'userId',
    foreignKey: 'id',
  })
  declare user: HasOne<typeof User>;

  @hasOne(() => Profile, {
    localKey: 'userId',
    foreignKey: 'userId',
  })
  declare profile: HasOne<typeof Profile>;

  @manyToMany(() => Class, {
    pivotColumns: ['period_id'],
    pivotTable: 'student_classes',
  })
  declare classes: ManyToMany<typeof Class>;

  @manyToMany(() => Course, {
    pivotTable: 'student_courses',
    pivotColumns: ['period_id', 'teacher_id'],
  })
  declare courses: ManyToMany<typeof Course>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
