import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'

export default class PasswordResetToken extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  
  @column()
  declare token: string

  @column()
  declare userId: number

  @column()
  declare expiresAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}