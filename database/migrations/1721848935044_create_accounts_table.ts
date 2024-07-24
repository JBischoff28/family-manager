import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'accounts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('primary_account_holder_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable()
      table.integer('household_id').unsigned().references('id').inTable('households').onDelete('CASCADE').nullable()
      table.boolean('is_delinquent').defaultTo(false).notNullable()
      table.string('stripe_customer_id').notNullable()
      table.string('stripe_subscription_id').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}