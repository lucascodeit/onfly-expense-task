import { CommonError } from '../../../../common/exceptions/common-error'

export class ExpenseNotFound extends CommonError {
  errorStatus = 404
  constructor() {
    super('Expense not found or user is not owner')
  }
}
