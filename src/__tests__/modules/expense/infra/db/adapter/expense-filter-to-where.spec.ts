import { ExpenseFilter } from '../../../../../../modules/expense/domain/expense-filter'
import { ExpenseFilterToWhere } from '../../../../../../modules/expense/infra/db/adpater/expense-filter-to-where'
import { UserEntity } from '../../../../../../modules/user/infra/db/entities/user-entity'

describe('testing expense-filter-to-where adapter', () => {
  it('should convert expense-filter to object where', () => {
    const object = ExpenseFilterToWhere.of(
      new ExpenseFilter({
        userId: 15,
        id: 10
      })
    )
    const userEntity = new UserEntity()
    userEntity.id = 15

    expect(object.where.id).toEqual(10)
    expect(object.where.user).toEqual(userEntity)
  })
})
