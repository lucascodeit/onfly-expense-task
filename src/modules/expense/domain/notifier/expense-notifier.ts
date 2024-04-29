export interface ExpenseNotifier {
  sendMessage(data: { address: string; message: string })
}
