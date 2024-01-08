import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { NotificationStatus } from 'Contracts/enums'

export default class Notification extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public message: string

  @column.dateTime({ autoCreate: true })
  public date: DateTime

  @column()
  public status: NotificationStatus

  @column()
  public userId: string
}
