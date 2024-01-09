import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password, { expiresIn: '30min' })
      return response.ok(token)
    } catch {
      return response.unauthorized('Invalid credentials')
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
}
