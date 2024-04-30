import { ContextToAuth } from '../../../../../../../modules/user/infra/http/koa/adapter/context-to-user-auth'

describe('testing context-to-user-auth adapter', () => {
  it('should convert context to user-auth', () => {
    const ctxMock = {
      request: {
        body: {
          email: 'lucas@email.com',
          password: '123456'
        }
      }
    }

    const userAuth = ContextToAuth.of(ctxMock as any)

    expect(userAuth).toBeInstanceOf(ContextToAuth)
    expect(userAuth.email).toEqual('lucas@email.com')
    expect(userAuth.plainPassword).toEqual('123456')
  })
})
