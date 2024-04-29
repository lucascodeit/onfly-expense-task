import { Notifier } from '../notifier'

export class NotifierMock implements Notifier<{ address: string; message: string }> {
  async send(data: { address: string; message: string }): Promise<void> {
    console.log('Email enviado', data)
  }
}
