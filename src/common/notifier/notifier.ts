export interface Notifier<T = any> {
    send(data: T): Promise<void>
}
