import User from 'App/Models/User'
import StoreUserValidator from 'App/Modules/User/Validator/StoreUserValidator'
import UpdateUserValidator from 'App/Modules/User/Validator/UpdateUserValidator'
import UserInformationsEmail from 'App/Modules/User/Mailer/UserInformationsEmail'
import { string } from '@ioc:Adonis/Core/Helpers'

type UserCreateData = StoreUserValidator['schema']['props']

type UserUpdateData = UpdateUserValidator['schema']['props']

export default class UserService {
  public async getUsers() {
    const users = await User.all()
    return users
  }

  public async getUser(id: string) {
    const user = await User.findOrFail(id)
    return user
  }

  public async createUser(data: UserCreateData) {
    const tempPassword = string.generateRandom(12)
    const user = await User.create({ ...data, password: tempPassword })
    await new UserInformationsEmail(user, tempPassword).send()
    return user
  }

  public async updateUser(id: string, data: UserUpdateData) {
    const user = await User.findOrFail(id)
    user.merge(data)
    await user.save()
    return user
  }

  public async deleteUser(id: string) {
    const user = await User.findOrFail(id)
    await user.delete()
    return user
  }
}
