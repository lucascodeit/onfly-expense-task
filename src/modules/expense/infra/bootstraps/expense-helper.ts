import { container } from 'tsyringe'
import { ExpenseTokensEnum } from '../../domain/expense-tokens'
import { ExpenseService } from '../../domain/expense-service'

export function getExpenseService() {
  return container.resolve<ExpenseService>(ExpenseTokensEnum.SERVICE)
}
