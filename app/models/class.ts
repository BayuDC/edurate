import { DateTime } from 'luxon';
import { BaseModel, column, hasOne, manyToMany } from '@adonisjs/lucid/orm';
import type { HasOne, ManyToMany } from '@adonisjs/lucid/types/relations';

import Period from '#models/period';
import Student from '#models/student';

export default class Class extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @manyToMany(() => Student, {
    pivotColumns: ['period_id'],
    pivotTable: 'student_classes',
  })
  declare students: ManyToMany<typeof Student>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
