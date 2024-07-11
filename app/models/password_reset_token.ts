import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

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
}