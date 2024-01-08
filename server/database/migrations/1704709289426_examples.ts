import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { ExampleState } from 'Contracts/enums'

export default class extends BaseSchema {
  protected tableName = 'examples'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.enum('state', Object.values(ExampleState)).defaultTo(ExampleState.NEUF)
      table.boolean('available').notNullable().defaultTo(true)
      table.string('book_id').references('books.isbn')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
