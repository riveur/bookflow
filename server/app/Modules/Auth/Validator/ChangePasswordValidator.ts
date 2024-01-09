import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChangePasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    password: schema.string(),
    new_password: schema.string(),
    new_password_confirmation: schema.string({}, [rules.confirmed('new_password')]),
  })
}
