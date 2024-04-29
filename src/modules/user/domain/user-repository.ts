import { User } from './user'
import { UserRegister } from './user-register'

export interface UserRepository {
  createUser(user: UserRegister): Promise<{ id: number }>
  getUserByEmail(email: string): Promise<User>
  getById(id: number): Promise<User>
}
