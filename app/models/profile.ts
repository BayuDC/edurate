import { DateTime } from 'luxon';
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm';
import type { HasOne } from '@adonisjs/lucid/types/relations';

import User from '#models/user';

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  declare userId: number;

  @column()
  declare address?: string;
  @column()
  declare gender?: 'Male' | 'Female';
  @column.date()
  declare birthDate?: DateTime;
  @column()
  declare birthPlace?: string;
  @column()
  declare phone?: string;
  @column()
  declare avatar?: string;

  @hasOne(() => User, {
    localKey: 'userId',
    foreignKey: 'id',
  })
  declare user: HasOne<typeof User>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
