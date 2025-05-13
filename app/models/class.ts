import { DateTime } from 'luxon';
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm';
import type { HasOne } from '@adonisjs/lucid/types/relations';

import Period from '#models/period';

export default class Class extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare periodId: number;

  @hasOne(() => Period, {
    localKey: 'periodId',
    foreignKey: 'id',
  })
  declare period: HasOne<typeof Period>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
