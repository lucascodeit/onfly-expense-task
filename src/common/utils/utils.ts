export class Utils {
  static convertStringToDate(date: string) {
    if (!/\d{4}-\d{2}-\d{2}/.test(date)) {
      throw new Error('Invalid date string')
    }
    const dateParts = date.split('-')
    const [year, month, day] = dateParts.map(datePart => Number(datePart))
    return new Date(year, month - 1, day)
  }
}
