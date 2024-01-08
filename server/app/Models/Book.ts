import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Author from 'App/Models/Author'
import Category from 'App/Models/Category'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public isbn: string

  @column()
  public title: string

  @column()
  public coverUrl: string

  @column()
  public authorId: string

  @column()
  public categoryId: string

  @belongsTo(() => Author)
  public author: BelongsTo<typeof Author>

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
