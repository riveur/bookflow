import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { inject } from '@adonisjs/core/build/standalone'
import BookService from 'App/Modules/Book/Service/BookService'
import StoreBookValidator from 'App/Modules/Book/Validator/StoreBookValidator'
import UpdateBookValidator from 'App/Modules/Book/Validator/UpdateBookValidator'
import StoreBookExampleValidator from 'App/Modules/Book/Validator/StoreBookExampleValidator'
import UpdateBookExampleValidator from 'App/Modules/Book/Validator/UpdateBookExampleValidator'

@inject()
export default class BooksController {
  constructor(private bookService: BookService) {}

  public async index() {
    const books = (await this.bookService.getBooks()).map((book) => ({
      ...book.serialize(),
      available_examples: book.$extras.available_examples,
      unavailable_examples: book.$extras.unavailable_examples,
    }))
    return books
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const book = await this.bookService.getBook(params.isbn)
      return response.ok({
        ...book.serialize(),
        available_examples: book.$extras.available_examples,
        unavailable_examples: book.$extras.unavailable_examples,
      })
    } catch (error) {
      return response.notFound({ message: `Book "${params.isbn}" not found` })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(StoreBookValidator)
    try {
      const book = await this.bookService.createBook(payload)
      return response.created(book)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(UpdateBookValidator)
    try {
      const book = await this.bookService.updateBook(params.isbn, payload)
      return response.ok(book)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      await this.bookService.deleteBook(params.isbn)
      return response.noContent()
    } catch (error) {
      return response.notFound({ message: `Book "${params.isbn}" not found` })
    }
  }

  public async examples({ params, response }: HttpContextContract) {
    try {
      const examples = await this.bookService.getBookExamples(params.isbn)
      return response.ok(examples)
    } catch (error) {
      return response.notFound({ message: `Book example "${params.isbn}" not found` })
    }
  }

  public async storeExample({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(StoreBookExampleValidator)
    try {
      const example = await this.bookService.createBookExample(params.isbn, payload)
      return response.created(example)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  public async updateExample({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(UpdateBookExampleValidator)
    try {
      const example = await this.bookService.updateBookExample(
        params.isbn,
        params.exampleId,
        payload
      )
      return response.ok(example)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  public async destroyExample({ params, response }: HttpContextContract) {
    try {
      await this.bookService.deleteBookExample(params.isbn, params.exampleId)
      return response.noContent()
    } catch (error) {
      return response.notFound({ message: `Book example "${params.isbn}" not found` })
    }
  }
}
