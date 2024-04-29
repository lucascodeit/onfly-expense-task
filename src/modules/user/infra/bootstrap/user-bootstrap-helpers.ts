import { container } from 'tsyringe'
import { UserTokensEnum } from '../../domain/user-tokens'
import { UserService } from '../../domain/user-service'

export function getUserService() {
  return container.resolve<UserService>(UserTokensEnum.SERVICE)
}
