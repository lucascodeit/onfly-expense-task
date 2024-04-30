import { ContextToUserRegister } from '../../../../../../../modules/user/infra/http/koa/adapter/context-to-user-register'

describe('testing context-to-user-register adapter', () => {
  it('should convert context to user-register', () => {
    const ctxMock = {
      request: {
        body: {
          email: 'user@email.com',
          name: 'User Test',
          password: '123456'
        }
      }
    }

    const userRegister = ContextToUserRegister.of(ctxMock as any)

    expect(userRegister).toBeInstanceOf(ContextToUserRegister)
    expect(userRegister.email).toEqual('user@email.com')
    expect(userRegister.name).toEqual('User Test')
    expect(userRegister.password).toEqual('123456')
  })
})
