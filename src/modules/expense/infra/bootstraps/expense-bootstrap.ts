import { container } from 'tsyringe'
import { ExpenseTokensEnum } from '../../domain/expense-tokens'
import { ExpenseRepositoryDb } from '../db/expense-repository-db'
import { ExpenseServiceImpl } from '../../application/expense-service-impl'

export function expenseBootstrap() {
  container.register(ExpenseTokensEnum.REPOSITORY, ExpenseRepositoryDb)
  container.register(ExpenseTokensEnum.SERVICE, ExpenseServiceImpl)
}
