import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ExampleState } from 'Contracts/enums'

export default class StoreBookExampleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    state: schema.enum(Object.values(ExampleState)),
    available: schema.boolean(),
  })
}
