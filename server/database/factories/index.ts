import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'
import { Role } from 'Contracts/enums'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    number_phone: faker.phone.number(),
    role: Role.LIBRARIAN,
    password: 'password',
  }
}).build()
