import { container } from 'tsyringe'
import { UserTokensEnum } from '../../domain/user-tokens'
import { UserRepositoryDb } from '../db/user-repository-db'
import { UserServiceImpl } from '../../application/user-service-impl'

export function userBootstrap() {
  container.register(UserTokensEnum.REPOSITORY, UserRepositoryDb)
  container.register(UserTokensEnum.SERVICE, UserServiceImpl)
}
