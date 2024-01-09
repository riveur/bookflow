import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { inject } from '@adonisjs/core/build/standalone'
import UserService from 'App/Modules/User/Service/UserService'
import StoreUserValidator from 'App/Modules/User/Validator/StoreUserValidator'
import UpdateUserValidator from 'App/Modules/User/Validator/UpdateUserValidator'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  public async index() {
    const users = await this.userService.getUsers()
    return users
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const user = await this.userService.getUser(params.id)
      return response.ok(user)
    } catch {
      return response.notFound({ message: `User "${params.id}" not found` })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(StoreUserValidator)
    try {
      const user = await this.userService.createUser(payload)
      return response.ok(user)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(UpdateUserValidator)
    try {
      const user = await this.userService.updateUser(params.id, payload)
      return response.ok(user)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      await this.userService.deleteUser(params.id)
      return response.noContent()
    } catch {
      return response.notFound({ message: `User "${params.id}" not found` })
    }
  }
}
