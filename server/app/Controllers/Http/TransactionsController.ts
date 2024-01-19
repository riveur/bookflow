import { inject } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import TransactionService from 'App/Modules/Transaction/Service/TransactionService'
import StoreTransactionValidator from 'App/Modules/Transaction/Validator/StoreTransactionValidator'

@inject()
export default class TransactionsController {
  constructor(private transactionService: TransactionService) {}

  public async index({ auth }: HttpContextContract) {
    const transactions = await this.transactionService.getUserTransactions(auth.user!.id)
    return transactions
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const data = await request.validate(StoreTransactionValidator)
    try {
      const transaction = await this.transactionService.createTransaction(auth.user!.id, data)
      return response.ok(transaction)
    } catch (error) {
      return response.badRequest({ message: 'Exemplaire indisponible' })
    }
  }
}
