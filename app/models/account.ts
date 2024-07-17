import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare primaryAccountHolderId: number

  @column()
  declare isDelinquent: boolean
  
  @column()
  declare stripeCustomerId: string

  @column()
  declare stripeSubscriptionId: string

  @column()
  declare planType: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime


}