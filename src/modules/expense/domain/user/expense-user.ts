import { Jsonable } from '../../../../common/interfaces/jsonable'

export class ExpenseUserDTO {
  id: number
  name: string
  email: string
}

export class ExpenseUser implements Jsonable {
  constructor(protected params: ExpenseUserDTO) {}

  get id() {
    return this.params.id
  }

  get name() {
    return this.params.name
  }

  get email() {
    return this.params.email
  }

  toJson() {
    return { ...this.params }
  }
}
