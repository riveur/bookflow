import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'BooksController.index')
  Route.get('/:isbn', 'BooksController.show')
  Route.post('/', 'BooksController.store')
  Route.put('/:isbn', 'BooksController.update')
  Route.delete('/:isbn', 'BooksController.destroy')
  Route.get('/:isbn/examples', 'BooksController.examples')
  Route.post('/:isbn/examples', 'BooksController.storeExample')
  Route.put('/:isbn/examples/:exampleId', 'BooksController.updateExample')
  Route.delete('/:isbn/examples/:exampleId', 'BooksController.destroyExample')
})
  .prefix('books')
  .middleware('auth')
