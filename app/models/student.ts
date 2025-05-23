import { DateTime } from 'luxon';
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm';
import type { HasOne } from '@adonisjs/lucid/types/relations';

import User from '#models/user';
import Profile from '#models/profile';

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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
