import { UserRegister } from '../../../../../../modules/user/domain/user-register'
import { UserRegisterToUserEntity } from '../../../../../../modules/user/infra/db/adapter/user-register-to-user-entity'

describe('testing user-register-to-user-entity adapter', () => {
  it('should convert user-register to user-entity', () => {
    const userRegister = new UserRegister({
      email: 'lucas@email.com',
      name: 'Lucas',
      password: '123456'
    })

    const userEntity = UserRegisterToUserEntity.of(userRegister)

    expect(userEntity).toBeInstanceOf(UserRegisterToUserEntity)
    expect(userEntity.email).toEqual(userRegister.email)
    expect(userEntity.name).toEqual(userRegister.name)
    expect(userEntity.password).toEqual(userRegister.password)
  })
})
