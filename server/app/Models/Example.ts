import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Book from 'App/Models/Book'
import { ExampleState } from 'Contracts/enums'

export default class Example extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public state: ExampleState

  @column()
  public available: boolean

  @column({ columnName: 'book_id' })
  public bookIsbn: string

  @belongsTo(() => Book)
  public book: BelongsTo<typeof Book>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
