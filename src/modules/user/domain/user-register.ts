import bcrypt from 'bcrypt'
import { Jsonable } from '../../../common/interfaces/jsonable'

export interface UserRegisterDTO {
  name: string
  email: string
  password: string
}

export class UserRegister implements Jsonable {
  constructor(protected params: UserRegisterDTO) {}

  get name() {
    return this.params.name
  }

  get email() {
    return this.params.email
  }

  get password() {
    return this.params.password
  }

  set password(value) {
    this.params.password = value
  }

  toJson() {
    return { ...this.params }
  }
}
