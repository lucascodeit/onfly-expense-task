import { Jsonable } from '../../../common/interfaces/jsonable'

export interface UserJWTDTO {
  token: string
}

export class UserJWT implements Jsonable {
  constructor(protected params: UserJWTDTO) {}

  toJson() {
    return { ...this.params }
  }
}
