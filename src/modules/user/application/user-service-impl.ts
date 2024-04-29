import { inject, injectable } from 'tsyringe'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { UserAuthError } from '../domain/exceptions/user-auth-error'
import { UserService } from '../domain/user-service'
import { UserTokensEnum } from '../domain/user-tokens'
import { UserRepository } from '../domain/user-repository'
import { UserRegister } from '../domain/user-register'
import { User } from '../domain/user'
import { UserAuth } from '../domain/user-auth'
import { UserJWT } from '../domain/user-jwt'

@injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @inject(UserTokensEnum.REPOSITORY)
    private userRepository: UserRepository
  ) {}

  async saveUser(userRegister: UserRegister): Promise<{ id: number }> {
    const passwordEncrypted = await this.hashPassword(userRegister.password)
    userRegister.password = passwordEncrypted
    return this.userRepository.createUser(userRegister)
  }

  async auth(auth: UserAuth): Promise<UserJWT> {
    const user = await this.userRepository.getUserByEmail(auth.email)
    if (!user) throw new UserAuthError()
    const passwordCorrect = await this.comparePassword(user.password, auth.plainPassword)
    if (!passwordCorrect) throw new UserAuthError()
    return this.generateUserJwtToken(user)
  }

  public async getByToken(token: string): Promise<User | null> {
    const jwtDecoded = jsonwebtoken.decode(token, { json: true })
    const { id } = jwtDecoded
    const user = await this.userRepository.getById(id)
    if (!user) throw new UserAuthError()
    return user
  }

  private generateUserJwtToken(user: User): UserJWT {
    const jwt = jsonwebtoken.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_KEY,
      {
        expiresIn: '7d'
      }
    )
    return new UserJWT({ token: jwt })
  }

  private async comparePassword(encryptedPassword: string, plainPassword: string) {
    return bcrypt.compare(plainPassword, encryptedPassword)
  }

  private async hashPassword(password: string) {
    const encrypted = await bcrypt.hash(password, 12)
    return encrypted
  }
}
