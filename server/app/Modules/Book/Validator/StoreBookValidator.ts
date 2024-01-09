import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreBookValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    isbn: schema.string({ trim: true }),
    title: schema.string({ trim: true }),
    cover_url: schema.string({ trim: true }, [rules.url()]),
    author_id: schema.string.optional({}, [
      rules.exists({ table: 'authors', column: 'id' }),
      rules.requiredIfNotExists('author'),
    ]),
    author: schema.string.optional({ trim: true }),
    category_id: schema.string.optional({}, [
      rules.exists({ table: 'categories', column: 'id' }),
      rules.requiredIfNotExists('category'),
    ]),
    category: schema.string.optional({ trim: true }),
  })
}
