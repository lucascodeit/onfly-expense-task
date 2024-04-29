import { CommonError } from '../../../../common/exceptions/common-error'

export class UserAuthError extends CommonError {
  errorStatus = 401

  constructor() {
    super('Access Unauthorized')
  }
}
