import { Jsonable } from '../../../common/interfaces/jsonable'

export interface UserDTO {
  id: number
  name: string
  email: string
  password: string
}

export class User implements Jsonable {
  constructor(protected params: UserDTO) {}

  get id() {
    return this.params.id
  }

  get name() {
    return this.params.name
  }

  get email() {
    return this.params.email
  }

  get password() {
    return this.params.password
  }

  toJson() {
    const { email, name, id } = this.params
    return { email, name, id }
  }
}
