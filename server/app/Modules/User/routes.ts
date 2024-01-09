import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'UsersController.index').middleware('role:librarian')
  Route.get('/:id', 'UsersController.show').middleware('role:librarian')
  Route.post('/', 'UsersController.store').middleware('role:librarian')
  Route.put('/:id', 'UsersController.update').middleware('role:librarian')
  Route.delete('/:id', 'UsersController.destroy').middleware('role:librarian')
  Route.get('/:id/transactions', 'UsersController.userTransactions').middleware('role:librarian')
  Route.post('/:id/transactions/:transactionId/end', 'UsersController.endTransaction')
})
  .prefix('users')
  .middleware('auth')
