import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}