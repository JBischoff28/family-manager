import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'

//Model Imports
import User from '#models/user'
import WorkSchedule from '#models/work_schedule'

export default class Occupation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare jobTitle: string

  @column()
  declare jobSetting: string

  @column()
  declare jobCompany: string

  @column()
  declare primaryAddress: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasOne(() => WorkSchedule)
  declare workSchedule: HasOne<typeof WorkSchedule>
}