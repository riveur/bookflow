import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Example from 'App/Models/Example'
import User from 'App/Models/User'
import { TransactionStatus } from 'Contracts/enums'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true })
  public date: DateTime

  @column.date()
  public expectedReturnDate: DateTime

  @column.dateTime()
  public realReturnDate?: DateTime

  @column()
  public status: TransactionStatus

  @column()
  public exampleId: string

  @column()
  public userId: string

  @belongsTo(() => Example)
  public example: BelongsTo<typeof Example>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
