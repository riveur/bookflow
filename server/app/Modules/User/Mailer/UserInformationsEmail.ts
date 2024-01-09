import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'

export default class UserInformationsEmail extends BaseMailer {
  constructor(
    private user: User,
    private tempPassword: string
  ) {
    super()
  }

  public prepare(message: MessageContract) {
    message
      .subject('[Bookflow] User informations')
      .from('no-reply@bookflow.com')
      .to(this.user.email)
      .htmlView('emails/user_informations', {
        user: { fullname: this.user.fullname, email: this.user.email },
        tempPassword: this.tempPassword,
      })
  }
}
