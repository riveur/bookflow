import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { inject } from '@adonisjs/core/build/standalone'
import AuthorService from 'App/Modules/Book/Service/AuthorService'

@inject()
export default class AuthorsController {
  constructor(private authorServive: AuthorService) {}

  public async index({ response }: HttpContextContract) {
    const authors = await this.authorServive.getAuthors()
    return response.ok(authors)
  }

  public async show({ response, params }: HttpContextContract) {
    const author = await this.authorServive.getAuthor(params.id)
    return response.ok(author)
  }
}
