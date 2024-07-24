import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'

// Model Imports
import PasswordResetToken from '#models/password_reset_token'
import Role from '#models/role'
import ContactMethod from '#models/contact_method'
import Occupation from '#models/occupation'
import Household from '#models/household'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email', 'username'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column()
  declare username: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime()
  declare dateOfBirth: DateTime

  @column()
  declare rememberMeToken?: string

  @column()
  declare isVerified: boolean

  @column()
  declare roleId?: number

  @column()
  declare householdId?: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasOne(() => PasswordResetToken)
  declare passwordResetToken: HasOne<typeof PasswordResetToken>

  @belongsTo(() => Household)
  declare household: BelongsTo<typeof Household>

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @hasMany(() => ContactMethod)
  declare contactMethods: HasMany<typeof ContactMethod>

  @hasMany(() => Occupation)
  declare occupations: HasMany<typeof Occupation>
}