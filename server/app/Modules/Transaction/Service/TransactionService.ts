import Transaction from 'App/Models/Transaction'
import StoreTransactionValidator from '../Validator/StoreTransactionValidator'
import { DateTime } from 'luxon'
import { TransactionStatus } from 'Contracts/enums'

type TransactionCreateData = StoreTransactionValidator['schema']['props']

export default class TransactionService {
  public async getUserTransactions(userId: string) {
    const transactions = await Transaction.query()
      .where('user_id', userId)
      .preload('example', (query) => query.preload('book'))
      .orderBy('date')
    return transactions
  }

  public async createTransaction(userId: string, data: TransactionCreateData) {
    const transaction = await Transaction.create({
      userId,
      status: TransactionStatus.EMPRUNTE,
      ...data,
    })

    if (!transaction.id) {
      throw new Error('Transaction not created')
    }

    return transaction
  }

  public async endTransaction(transactionId: string, userId: string) {
    const transaction = await Transaction.query()
      .where('id', transactionId)
      .andWhere('user_id', userId)
      .firstOrFail()
    await transaction
      .merge({ realReturnDate: DateTime.now(), status: TransactionStatus.RENDU })
      .save()
    return transaction
  }
}
