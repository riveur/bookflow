import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'UsersController.index')
  Route.get('/:id', 'UsersController.show')
  Route.post('/', 'UsersController.store')
  Route.put('/:id', 'UsersController.update')
  Route.delete('/:id', 'UsersController.destroy')
  Route.get('/:id/transactions', 'UsersController.userTransactions')
  Route.post('/:id/transactions/:transactionId/end', 'UsersController.endTransaction')
})
  .prefix('users')
  .middleware('auth')
