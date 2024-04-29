import { Jsonable } from '../../../common/interfaces/jsonable'
import { ExpenseUser } from './user/expense-user'

export interface ExpenseRegisterDTO {
  description: string
  date: Date
  value: number
  user: ExpenseUser
}

export class ExpenseRegister implements Jsonable {
  constructor(protected params: ExpenseRegisterDTO) {}

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
    return { ...this.params }
  }
}
