import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations';
import User from '#models/user';
import Profile from '#models/profile';

export default class Teacher extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare code: string;

  @column()
  declare userId: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>;

  @hasOne(() => Profile, {
    localKey: 'userId',
    foreignKey: 'userId',
  })
  declare profile: HasOne<typeof Profile>;
}
