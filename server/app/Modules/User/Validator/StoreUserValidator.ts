import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Role } from 'Contracts/enums'

export default class StoreUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstname: schema.string({ trim: true }, [rules.maxLength(255)]),
    lastname: schema.string({ trim: true }, [rules.maxLength(255)]),
    email: schema.string({ trim: true }, [
      rules.maxLength(255),
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    address: schema.string({ trim: true }, [rules.maxLength(255)]),
    number_phone: schema.string({ trim: true }, [rules.maxLength(255)]),
    role: schema.enum(Object.values(Role)),
  })
}
