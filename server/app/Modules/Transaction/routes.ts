import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'TransactionsController.index')
  Route.post('/', 'TransactionsController.store')
})
  .prefix('transactions')
  .middleware('auth')
