import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

// Model Imports
import WorkSchedule from '#models/work_schedule'

export default class WorkDayLine extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare workScheduleId: number

  @column()
  declare dayOfWeek: string

  @column.dateTime()
  declare startTime: DateTime

  @column.dateTime()
  declare endTime: DateTime

  @column()
  declare notes: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => WorkSchedule)
  declare workSchedule: BelongsTo<typeof WorkSchedule>
}