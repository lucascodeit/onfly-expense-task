export class CommonError extends Error {
  protected errorStatus: number
  constructor(msg: string) {
    super(msg)
  }

  get status() {
    return this.errorStatus
  }
}
