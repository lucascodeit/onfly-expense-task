import { CommonError } from '../../../../common/exceptions/common-error'

export class ExpenseValidationError extends CommonError {
  errorStatus = 400
  constructor(errorMessage: string) {
    super(errorMessage)
  }
}
