import { Jsonable } from '../../../common/interfaces/jsonable'

export interface ExpenseFilterDTO {
  id?: number
  userId: number
}

export class ExpenseFilter implements Jsonable {
  constructor(protected params: ExpenseFilterDTO) {}

  get id() {
    return this.params.id
  }

  get userId() {
    return this.params.userId
  }

  toJson() {
    return {
      ...this.params
    }
  }
}
