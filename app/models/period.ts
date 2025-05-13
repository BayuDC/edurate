import { DateTime } from 'luxon';
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import type { HasMany } from '@adonisjs/lucid/types/relations';

import Class from '#models/class';

export default class Period extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column.date()
  declare startDate: DateTime;

  @column.date()
  declare endDate: DateTime;

  @hasMany(() => Class, { foreignKey: 'periodId' })
  declare classes: HasMany<typeof Class>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
