import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { Role } from 'Contracts/enums'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.string('firstname').notNullable()
      table.string('lastname').notNullable()
      table.string('email').notNullable().unique()
      table.string('address').notNullable()
      table.string('number_phone').notNullable()
      table.string('password').notNullable()
      table.enum('role', Object.values(Role)).defaultTo(Role.USER)

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
