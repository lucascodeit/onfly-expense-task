import { UserRegister } from '../../../domain/user-register'
import { UserEntity } from '../entities/user-entity'

export class UserRegisterToUserEntity extends UserEntity {
  private constructor(user: UserRegister) {
    super()
    this.email = user.email
    this.name = user.name
    this.password = user.password
  }

  static of(userRegister: UserRegister): UserEntity {
    return new UserRegisterToUserEntity(userRegister)
  }
}
