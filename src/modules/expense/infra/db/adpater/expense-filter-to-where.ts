import { FindOptionsWhere } from 'typeorm'
import { ExpenseFilter } from '../../../domain/expense-filter'
import { ExpenseEntity } from '../entities/expense-entity'
import { UserEntity } from '../../../../user/infra/db/entities/user-entity'

export class ExpenseFilterToWhere {
  public where: FindOptionsWhere<ExpenseEntity> = {}
  private constructor(protected filter: ExpenseFilter) {
    this.addIdFilter().addUserIdFilter()
  }

  private addIdFilter() {
    if (!this.filter.id) return this
    this.where.id = this.filter.id
    return this
  }

  private addUserIdFilter() {
    if (!this.filter.userId) return this

    this.where.user = new UserEntity()
    this.where.user.id = this.filter.userId
  }

  static of(filter: ExpenseFilter): ExpenseFilterToWhere {
    return new ExpenseFilterToWhere(filter)
  }
}
