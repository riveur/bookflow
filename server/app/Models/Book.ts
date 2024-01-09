import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasMany,
  ModelQueryBuilderContract,
  belongsTo,
  column,
  hasMany,
  scope,
} from '@ioc:Adonis/Lucid/Orm'
import Author from 'App/Models/Author'
import Category from 'App/Models/Category'
import Example from 'App/Models/Example'

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

  @hasMany(() => Example)
  public examples: HasMany<typeof Example>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static withExamplesScope = scope((query: ModelQueryBuilderContract<typeof Book>) => {
    query
      .withCount('examples', (q) => q.where('available', true).as('available_examples'))
      .withCount('examples', (q) => q.where('available', false).as('unavailable_examples'))
  })
}
