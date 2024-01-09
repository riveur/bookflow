import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreTransactionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    expected_return_date: schema.date({ format: 'yyyy-MM-dd' }, [rules.afterOrEqual('today')]),
    example_id: schema.string({}, [rules.exists({ table: 'examples', column: 'id' })]),
  })
}
