const mockMethod = jest.fn().mockImplementation(data => {})

jest.mock('typeorm', () => ({
  DataSource: class DataSourceMock {
    constructor(protected datasource: any) {}
    get data() {
      return this.datasource
    }
  }
}))
import { dataSource } from '../../../common/db/data-source'

describe('testing data-source from db', () => {
  it('should have the correct configurations', () => {
    expect((dataSource as any).data).toMatchSnapshot()
  })
})
