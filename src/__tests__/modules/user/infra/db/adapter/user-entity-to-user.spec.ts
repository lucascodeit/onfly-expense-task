import { UserEntityToUser } from '../../../../../../modules/user/infra/db/adapter/user-entity-to-user'
import { UserEntity } from '../../../../../../modules/user/infra/db/entities/user-entity'

describe('testing user-entity-to-user adapter', () => {
  it('should convert user-entity to user', () => {
    const userEntity = new UserEntity()
    userEntity.email = 'lucas@email.com'
    userEntity.id = 123
    userEntity.name = 'Lucas'
    userEntity.password = '123456'

    const user = UserEntityToUser.of(userEntity)

    expect(user).toBeInstanceOf(UserEntityToUser)
    expect(user.email).toEqual(userEntity.email)
    expect(user.id).toEqual(userEntity.id)
    expect(user.name).toEqual(userEntity.name)
    expect(user.password).toEqual(userEntity.password)
  })
})
