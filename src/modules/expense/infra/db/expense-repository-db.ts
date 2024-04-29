import { injectable } from 'tsyringe'
import { Pagination } from '../../../../common/interfaces/pagination'
import { Expense } from '../../domain/expense'
import { ExpenseFilter } from '../../domain/expense-filter'
import { ExpenseRegister } from '../../domain/expense-register'
import { ExpenseRepository } from '../../domain/expense-repository'
import { getDataSoure } from '../../../../common/db/data-source'
import { ExpenseEntity } from './entities/expense-entity'
import { Repository } from 'typeorm'
import { ExpenseRegisterToExpenseEntity } from './adpater/expense-register-to-expense-entity'
import { ExpenseEntityToExpense } from './adpater/expense-entity-to-expense'
import { ExpenseFilterToWhere } from './adpater/expense-filter-to-where'

@injectable()
export class ExpenseRepositoryDb implements ExpenseRepository {
  async create(expense: ExpenseRegister): Promise<Expense> {
    const source = await this.getRepository()
    const expenseSaved = await source.save(ExpenseRegisterToExpenseEntity.of(expense))
    return ExpenseEntityToExpense.of(expenseSaved)
  }

  async update(filter: ExpenseFilter, data: ExpenseRegister): Promise<Expense> {
    const source = await this.getRepository()
    const expense = await this.getOne(filter)
    if (!expense) return null
    const dataForUpdate = ExpenseRegisterToExpenseEntity.of(data)
    const result = await source.update(expense.id, dataForUpdate)
    if (!result || result.affected < 1) {
      return null
    }
    return new Expense({
      id: expense.id,
      date: dataForUpdate.date,
      value: dataForUpdate.value,
      description: dataForUpdate.description,
      user: expense.user
    })
  }

  async delete(filter: ExpenseFilter): Promise<number> {
    const source = await this.getRepository()
    const expenseToUpdate = await this.getOne(filter)
    if (!expenseToUpdate) return null
    const result = await source.delete(expenseToUpdate.id)
    if (!result || result.affected < 1) {
      return null
    }
    return result.affected
  }

  async getList(filter: ExpenseFilter): Promise<Expense[]> {
    const source = await this.getRepository()
    const where = ExpenseFilterToWhere.of(filter).where
    const result = await source.find({ where, relations: ['user'] })
    if (!result) return null
    return result.map(ExpenseEntityToExpense.of)
  }

  async getOne(filter: ExpenseFilter): Promise<Expense> {
    const source = await this.getRepository()
    const where = ExpenseFilterToWhere.of(filter).where
    const result = await source.findOne({ where, relations: ['user'] })
    if (!result) return null
    return ExpenseEntityToExpense.of(result)
  }

  private async getRepository(): Promise<Repository<ExpenseEntity>> {
    const source = await getDataSoure()
    return source.getRepository(ExpenseEntity)
  }
}
