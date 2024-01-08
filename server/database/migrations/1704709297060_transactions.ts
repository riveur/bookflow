import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { TransactionStatus } from 'Contracts/enums'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.timestamp('date', { useTz: true }).notNullable()
      table.date('expected_return_date').notNullable()
      table.timestamp('real_return_date', { useTz: true })
      table.enum('status', Object.values(TransactionStatus)).defaultTo(TransactionStatus.EMPRUNTE)
      table.uuid('example_id').references('examples.id')
      table.uuid('user_id').references('users.id')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
