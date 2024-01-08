import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { NotificationStatus } from 'Contracts/enums'

export default class extends BaseSchema {
  protected tableName = 'notifications'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.string('message').notNullable()
      table.dateTime('date', { useTz: true }).notNullable()
      table.enum('status', Object.values(NotificationStatus)).defaultTo(NotificationStatus.UNREAD)
      table.uuid('user_id').references('users.id')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
