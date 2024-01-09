import Category from 'App/Models/Category'

export default class CategoryService {
  public async getCategories() {
    const authors = await Category.all()
    return authors
  }

  public async getCategory(id: string) {
    const author = await Category.findByOrFail('id', id)
    return author
  }
}
