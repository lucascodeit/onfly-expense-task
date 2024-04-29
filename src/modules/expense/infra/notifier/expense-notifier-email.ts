import { NotifierMock } from '../../../../common/notifier/mock/notifier-mock'
import { ExpenseNotifier } from '../../domain/notifier/expense-notifier'

export class ExpenseNotifierEmail implements ExpenseNotifier {
  sendMessage(data: { address: string; message: string }) {
    const notifierEmail = new NotifierMock()
    notifierEmail.send({
      message: data.message,
      address: data.address
    })
  }
}
