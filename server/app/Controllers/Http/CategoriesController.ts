import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { inject } from '@adonisjs/core/build/standalone'
import { CategoryService } from 'App/Modules/Book/Service/CategoryService'

@inject()
export default class CategoriesController {
  constructor(private categoryService: CategoryService) {}

  public async index({ response }: HttpContextContract) {
    const categories = await this.categoryService.getCategories()
    return response.ok(categories)
  }

  public async show({ response, params }: HttpContextContract) {
    const category = await this.categoryService.getCategory(params.id)
    return response.ok(category)
  }
}
