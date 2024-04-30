import { ExpenseFilter } from '../../../../../../modules/expense/domain/expense-filter'
import { ContextToFilter } from '../../../../../../modules/expense/infra/http/adapter/context-to-filter'

describe('testing context-to-filter adapter', () => {
  it('should convert context to filter full', () => {
    const filterAdapted = ContextToFilter.of({
      global: { user: { id: 15 } },
      params: { id: 10 }
    })

    expect(filterAdapted).toBeInstanceOf(ExpenseFilter)
    expect(filterAdapted.toJson()).toMatchObject({ id: 10, userId: 15 })
  })

  it('should convert context to filter without id', () => {
    const filterAdapted = ContextToFilter.of({
      global: { user: { id: 15 } },
      params: {}
    })
    expect(filterAdapted.toJson()).toMatchObject({ userId: 15 })
  })
})
