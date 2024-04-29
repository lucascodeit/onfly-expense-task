import { Repository } from 'typeorm'
import { injectable } from 'tsyringe'
import { getDataSoure } from '../../../../common/db/data-source'
import { UserRepository } from '../../domain/user-repository'
import { UserRegister } from '../../domain/user-register'
import { User } from '../../domain/user'
import { UserEntity } from './entities/user-entity'
import { UserRegisterToUserEntity } from './adapter/user-register-to-user-entity'
import { UserEntityToUser } from './adapter/user-entity-to-user'

@injectable()
export class UserRepositoryDb implements UserRepository {
  async createUser(userRegister: UserRegister): Promise<{ id: number }> {
    const source = await this.getUserRepository()
    const userEntitiy = UserRegisterToUserEntity.of(userRegister)
    const userCreated = await source.save(userEntitiy)
    return { id: userCreated.id }
  }

  async getById(id: number): Promise<User> {
    const source = await this.getUserRepository()
    const user = await source.findOne({ where: { id } })
    if (user) {
      return UserEntityToUser.of(user)
    }
    return null
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const source = await this.getUserRepository()
    const user = await source.findOne({ where: { email } })
    if (user) {
      return UserEntityToUser.of(user)
    }
    return null
  }

  async getUserRepository(): Promise<Repository<UserEntity>> {
    const source = await getDataSoure()
    return source.getRepository(UserEntity)
  }
}
