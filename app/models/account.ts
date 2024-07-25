import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

// Model Imports
import User from '#models/user'
import Household from '#models/household'

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare householdId?: number

  @column()
  declare isDelinquent: boolean
  
  @column()
  declare stripeCustomerId: string

  @column()
  declare stripeSubscriptionId?: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare primaryAccountHolder: BelongsTo<typeof User>

  @belongsTo(() => Household)
  declare household: BelongsTo<typeof Household>
}