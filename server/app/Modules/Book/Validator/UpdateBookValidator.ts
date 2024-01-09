import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateBookValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    isbn: schema.string.optional({ trim: true }),
    title: schema.string.optional({ trim: true }),
    cover_url: schema.string.optional({ trim: true }, [rules.url()]),
    author_id: schema.string.optional({}, [rules.exists({ table: 'authors', column: 'id' })]),
    author: schema.string.optional({ trim: true }),
    category_id: schema.string.optional({}, [rules.exists({ table: 'categories', column: 'id' })]),
    category: schema.string.optional({ trim: true }),
  })
}
