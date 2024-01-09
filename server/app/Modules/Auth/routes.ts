import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.get('/logout', 'AuthController.logout').middleware('auth')
  Route.get('/me', 'AuthController.me').middleware('auth')
}).prefix('auth')
