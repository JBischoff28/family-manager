import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'

// Model Imports
import User from '#models/user'
import { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class ContactMethod extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare methodType: string

  @column()
  declare methodValue: string

  @column()
  declare notes: string

  @column()
  declare isPrimary: boolean

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}