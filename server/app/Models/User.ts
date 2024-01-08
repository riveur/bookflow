import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { Role } from 'Contracts/enums'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public firstname: string

  @column()
  public lastname: string

  @column()
  public email: string

  @column()
  public address: string

  @column()
  public number_phone: string

  @column()
  public password: string

  @column()
  public role: Role

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
