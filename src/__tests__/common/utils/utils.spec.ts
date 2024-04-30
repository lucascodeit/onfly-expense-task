import { Utils } from '../../../common/utils/utils'

describe('testing convertStringToDate from utils.ts common', () => {
  it('should convert date str to javascript Date', () => {
    const date = Utils.convertStringToDate('2024-04-29')
    expect(date).toBeInstanceOf(Date)
    expect(date.getUTCDate()).toBe(29)
    expect(date.getUTCFullYear()).toBe(2024)
    expect(date.getUTCMonth()).toBe(3)
  })

  it('should throw an error if param date string is incorrect', () => {
    try {
      Utils.convertStringToDate('2024-1429')
    } catch (error) {
      expect(error.toString()).toBe('Error: Invalid date string')
    }
  })
})
