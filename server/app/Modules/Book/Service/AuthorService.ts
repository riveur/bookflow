import Author from 'App/Models/Author'

export default class AuthorService {
  public async getAuthors() {
    const authors = await Author.all()
    return authors
  }

  public async getAuthor(id: string) {
    const author = await Author.findByOrFail('id', id)
    return author
  }
}
