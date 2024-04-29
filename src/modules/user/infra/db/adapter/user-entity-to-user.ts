import { User } from '../../../domain/user'
import { UserEntity } from '../entities/user-entity'

export class UserEntityToUser extends User {
  private constructor(user: UserEntity) {
    super({ email: user.email, id: user.id, name: user.name, password: user.password })
  }

  static of(userEntity: UserEntity): UserEntityToUser {
    return new UserEntityToUser(userEntity)
  }
}
