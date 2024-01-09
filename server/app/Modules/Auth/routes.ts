import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.get('/logout', 'AuthController.logout').middleware('auth')
  Route.get('/me', 'AuthController.me').middleware('auth')
  Route.put('/change-password', 'AuthController.changePassword').middleware('auth')
}).prefix('auth')
