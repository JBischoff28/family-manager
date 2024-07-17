import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'occupations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('job_title').notNullable()
      table.string('job_company').notNullable()
      table.enum('job_setting', ['Remote', 'Hybrid', 'On-Site']).defaultTo('On-Site').notNullable()
      table.string('primary_address').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}