import * as yup from 'yup'

export class ExpenseValidation {
  static getExpenseSchema() {
    return yup.object({
      body: yup.object({
        value: yup.number().positive().required(),
        description: yup.string().max(191).required(),
        date: yup.date().max(new Date(), 'Date invalid: Can not be future')
      })
    })
  }
}
