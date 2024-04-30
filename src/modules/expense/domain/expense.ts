import { Jsonable } from '../../../common/interfaces/jsonable'
import { ExpenseUser } from './user/expense-user'

export interface ExpenseDTO {
  id: number
  description: string
  date: Date
  value: number
  user: ExpenseUser
}

export class Expense implements Jsonable {
  constructor(protected params: ExpenseDTO) {}

  get id() {
    return this.params.id
  }

  get description() {
    return this.params.description
  }

  get value() {
    return this.params.value
  }

  get date() {
    return this.params.date
  }

  get user() {
    return this.params.user
  }

  toJson() {
    return { ...this.params, user: this.user?.toJson() }
  }
}
