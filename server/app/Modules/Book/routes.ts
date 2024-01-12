import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'BooksController.index')
  Route.get('/:isbn', 'BooksController.show')
  Route.post('/', 'BooksController.store').middleware('role:librarian')
  Route.put('/:isbn', 'BooksController.update').middleware('role:librarian')
  Route.delete('/:isbn', 'BooksController.destroy').middleware('role:librarian')
  Route.get('/:isbn/examples', 'BooksController.examples')
  Route.get('/:isbn/examples/:exampleId', 'BooksController.example')
  Route.post('/:isbn/examples', 'BooksController.storeExample').middleware('role:librarian')
  Route.put('/:isbn/examples/:exampleId', 'BooksController.updateExample').middleware(
    'role:librarian'
  )
  Route.delete('/:isbn/examples/:exampleId', 'BooksController.destroyExample').middleware(
    'role:librarian'
  )
})
  .prefix('books')
  .middleware('auth')

Route.group(() => {
  Route.get('/', 'AuthorsController.index')
  Route.get('/:id', 'AuthorsController.show')
})
  .prefix('authors')
  .middleware('auth')

Route.group(() => {
  Route.get('/', 'CategoriesController.index')
  Route.get('/:id', 'CategoriesController.show')
})
  .prefix('categories')
  .middleware('auth')
