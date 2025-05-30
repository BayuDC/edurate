import { DateTime } from 'luxon';
import hash from '@adonisjs/core/services/hash';
import { compose } from '@adonisjs/core/helpers';
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm';
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid';
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens';
import type { HasOne } from '@adonisjs/lucid/types/relations';

import Profile from '#models/profile';

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'],
  passwordColumnName: 'password',
});

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare username: string;

  @column({ serializeAs: null })
  declare password: string;

  @column()
  declare email: string;

  @column()
  declare role: 'admin' | 'student' | 'teacher';

  @hasOne(() => Profile, {
    localKey: 'id',
    foreignKey: 'userId',
  })
  declare profile: HasOne<typeof Profile>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '3 days',
  });
}
