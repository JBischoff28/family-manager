import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

// Model Imports
import Occupation from '#models/occupation'
import WorkDayLine from '#models/work_day_line'

export default class WorkSchedule extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare occupationId: number

  @column()
  declare hoursPerWeek?: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Occupation)
  declare occupation: BelongsTo<typeof Occupation>

  @hasMany(() => WorkDayLine)
  declare workDays: HasMany<typeof WorkDayLine>
}