export class Utils {
  static convertStringToDate(date: string) {
    const dateParts = date.split('-')
    const [year, month, day] = dateParts.map(datePart => Number(datePart))
    return new Date(year, month - 1, day)
  }
}
