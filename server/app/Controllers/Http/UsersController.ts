import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { inject } from '@adonisjs/core/build/standalone'
import UserService from 'App/Modules/User/Service/UserService'
import StoreUserValidator from 'App/Modules/User/Validator/StoreUserValidator'
import UpdateUserValidator from 'App/Modules/User/Validator/UpdateUserValidator'
import TransactionService from 'App/Modules/Transaction/Service/TransactionService'
import { Role } from 'Contracts/enums'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'

@inject()
export default class UsersController {
  constructor(
    private userService: UserService,
    private transactionService: TransactionService
  ) {}

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

  public async userTransactions({ params, response }: HttpContextContract) {
    try {
      const transactions = await this.transactionService.getUserTransactions(params.id)
      return response.ok(transactions)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  public async endTransaction({ params, response, auth }: HttpContextContract) {
    if (auth.user!.role !== Role.LIBRARIAN && auth.user!.id !== params.id) {
      throw new UnauthorizedException()
    }

    try {
      const transaction = await this.transactionService.endTransaction(
        params.transactionId,
        params.id
      )
      return response.ok(transaction)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }
}
