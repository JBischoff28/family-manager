import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'work_day_lines'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('work_schedule_id').unsigned().references('id').inTable('work_schedules').onDelete('CASCADE').notNullable()
      table.enum('day_of_week', ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']).notNullable()
      table.timestamp('start_time').nullable()
      table.timestamp('end_time').nullable()
      table.text('notes').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}