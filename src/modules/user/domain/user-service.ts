import { User } from './user'
import { UserAuth } from './user-auth'
import { UserJWT } from './user-jwt'
import { UserRegister } from './user-register'

export interface UserService {
  saveUser(userRegister: UserRegister): Promise<{ id: number }>
  auth(auth: UserAuth): Promise<UserJWT>
  getByToken(token: string): Promise<User>
}
