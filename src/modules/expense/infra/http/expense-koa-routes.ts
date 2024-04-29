import Router from '@koa/router'
import { Context } from 'koa'
import { KoaRoutesBuilder } from '../../../../server/koa/koa-routes-builder'
import { ExpenseService } from '../../domain/expense-service'
import { getExpenseService } from '../bootstraps/expense-helper'
import { ContextToExpenseRegister } from './adapter/context-to-expense-register'
import { ContextToFilter } from './adapter/context-to-filter'

export class ExpenseKoaRoutes extends KoaRoutesBuilder {
  private expenseService: ExpenseService = getExpenseService()

  build(): Router {
    return this.postExpense().putExpense().deleteExpense().getExpense().getListExpense()
      .router
  }

  private postExpense() {
    this.router.post('/expense', async (ctx: Context) => {
      const result = await this.expenseService.saveExpense(
        ContextToExpenseRegister.of(ctx)
      )
      ctx.body = { id: result.id }
    })
    return this
  }

  private putExpense() {
    this.router.put('/expense/:id', async (ctx: Context) => {
      await this.expenseService.updateExpense(
        ContextToFilter.of(ctx),
        ContextToExpenseRegister.of(ctx)
      )
      ctx.status = 204
    })
    return this
  }

  private deleteExpense() {
    this.router.delete('/expense/:id', async (ctx: Context) => {
      await this.expenseService.removeExpense(ContextToFilter.of(ctx))
      ctx.status = 204
    })
    return this
  }

  private getExpense() {
    this.router.get('/expense/:id', async (ctx: Context) => {
      const result = await this.expenseService.getExpense(ContextToFilter.of(ctx))
      ctx.body = result.toJson()
    })
    return this
  }

  private getListExpense() {
    this.router.get('/expense', async (ctx: Context) => {
      const result = await this.expenseService.getListExpense(ContextToFilter.of(ctx))
      ctx.body = result.map(expense => expense.toJson())
    })
    return this
  }
}
