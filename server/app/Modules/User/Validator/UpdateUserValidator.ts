import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Role } from 'Contracts/enums'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstname: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
    lastname: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
    email: schema.string.optional({ trim: true }, [
      rules.maxLength(255),
      rules.email(),
      rules.unique({ table: 'users', column: 'email', whereNot: { id: this.ctx.params.id } }),
    ]),
    address: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
    number_phone: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
    role: schema.enum.optional(Object.values(Role)),
  })
}
