import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'

export default class Role {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>, guards: string[]) {
    const guardRoles = guards.map((k) => k.toLowerCase())

    if (!guardRoles.includes(auth.user!.role.toLowerCase())) {
      throw new UnauthorizedException()
    }

    await next()
  }
}
