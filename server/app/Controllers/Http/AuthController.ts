import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ChangePasswordValidator from 'App/Modules/Auth/Validator/ChangePasswordValidator'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password, { expiresIn: '30min' })
      return response.ok(token)
    } catch {
      return response.unauthorized({ message: 'Invalid credentials' })
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()
    return response.noContent()
  }

  public async me({ auth, response }: HttpContextContract) {
    const user = await auth.use('api').authenticate()
    return response.ok(user)
  }

  public async changePassword({ auth, request, response }: HttpContextContract) {
    const user = await auth.use('api').authenticate()!
    const payload = await request.validate(ChangePasswordValidator)

    const isPasswordValid = await Hash.verify(user.password, payload.password)

    if (!isPasswordValid) {
      return response.badRequest({ message: 'Invalid password' })
    }

    try {
      await user.merge({ password: payload.new_password }).save()
      await auth.use('api').revoke()
      return response.noContent()
    } catch {
      return response.badRequest({ message: 'Unable to change password' })
    }
  }
}
