import bcrypt from 'bcrypt'
import { Jsonable } from '../../../common/interfaces/jsonable'

export interface UserAuthDTO {
  email: string
  plainPassword: string
}

export class UserAuth implements Jsonable {
  constructor(protected params: UserAuthDTO) {}

  get email() {
    return this.params.email
  }

  get plainPassword() {
    return this.params.plainPassword
  }

  toJson() {
    return { ...this.params }
  }
}
