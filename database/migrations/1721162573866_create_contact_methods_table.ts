import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'contact_methods'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('method_type', 125).notNullable()
      table.string('method_value', 255).notNullable()
      table.boolean('is_primary').defaultTo(false).notNullable()
      table.text('notes').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}