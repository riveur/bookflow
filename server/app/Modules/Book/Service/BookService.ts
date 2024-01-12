import Book from 'App/Models/Book'
import StoreBookValidator from '../Validator/StoreBookValidator'
import Author from 'App/Models/Author'
import Category from 'App/Models/Category'
import UpdateBookValidator from 'App/Modules/Book/Validator/UpdateBookValidator'
import StoreBookExampleValidator from 'App/Modules/Book/Validator/StoreBookExampleValidator'
import UpdateBookExampleValidator from 'App/Modules/Book/Validator/UpdateBookExampleValidator'
import Example from 'App/Models/Example'

export default class BookService {
  public async getBooks() {
    const books = await Book.query()
      .preload('author')
      .preload('category')
      .withScopes((scopes) => scopes.withExamplesScope())
    return books
  }

  public async getBook(isbn: string) {
    const book = await Book.query()
      .preload('category')
      .preload('author')
      .withScopes((scopes) => scopes.withExamplesScope())
      .where('isbn', isbn)
      .firstOrFail()
    return book
  }

  public async createBook(data: StoreBookValidator['schema']['props']) {
    if (!data.author_id && data.author) {
      const author = await Author.firstOrCreate({ name: data.author })
      data.author_id = author.id
    }

    if (!data.category_id && data.category) {
      const category = await Category.firstOrCreate({ name: data.category })
      data.category_id = category.id
    }

    const bookExists = await Book.query().select('isbn').where('isbn', data.isbn).first()

    if (bookExists) {
      throw new Error(`Book "${data.isbn}" already exists`)
    }

    const { author, category, ...payload } = data

    const book = await Book.create(payload)
    return book
  }

  public async updateBook(isbn: string, data: UpdateBookValidator['schema']['props']) {
    const book = await Book.findByOrFail('isbn', isbn)

    if (!data.author_id && data.author) {
      const author = await Author.firstOrCreate({ name: data.author })
      data.author_id = author.id
    }

    if (!data.category_id && data.category) {
      const category = await Category.firstOrCreate({ name: data.category })
      data.category_id = category.id
    }

    const { author, category, ...payload } = data

    await book.merge(payload).save()
    return book
  }

  public async deleteBook(isbn: string) {
    const book = await Book.findByOrFail('isbn', isbn)
    await book.delete()
    return book.$isDeleted
  }

  public async getBookExamples(isbn: string) {
    const book = await Book.findByOrFail('isbn', isbn)
    const examples = await book.related('examples').query()
    return examples
  }

  public async getBookExample(isbn: string, exampleId: string) {
    const example = Example.query()
      .where('book_id', isbn)
      .andWhere('id', exampleId)
      .preload('book', (query) => query.preload('author').preload('category'))
      .firstOrFail()
    return example
  }

  public async createBookExample(isbn: string, data: StoreBookExampleValidator['schema']['props']) {
    const book = await Book.findByOrFail('isbn', isbn)
    const example = await book.related('examples').create(data)
    return example
  }

  public async updateBookExample(
    isbn: string,
    exampleId: string,
    data: UpdateBookExampleValidator['schema']['props']
  ) {
    const book = await Book.findByOrFail('isbn', isbn)
    const example = await book.related('examples').query().where('id', exampleId).firstOrFail()
    await example.merge(data).save()
    return example
  }

  public async deleteBookExample(isbn: string, exampleId: string) {
    const book = await Book.findByOrFail('isbn', isbn)
    const example = await book.related('examples').query().where('id', exampleId).firstOrFail()
    await example.delete()
    return example.$isDeleted
  }
}
