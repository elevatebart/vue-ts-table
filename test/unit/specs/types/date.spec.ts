import dateType from '@/components/types/date'
import { ColumnOptions } from '@/components/table'

describe('date type', () => {
  let colopt: ColumnOptions
  beforeEach(() => {
    colopt = {
      field: 'datetest',
      label: 'oops',
      type: 'date'
    }
  })

  describe('compare', () => {
    it('should compare dates correctly', () => {
      dateType.compare('20001211', '20001112').should.equal(1)
    })

    it('should compare dates correctly with custom format', () => {
      colopt.inputFormat = 'YYYYDDMM'
      dateType.compare('20001211', '20001112', colopt).should.equal(-1)
    })

    it('should compare null date as epoch', () => {
      colopt.inputFormat = 'YYYYDDMM'
      dateType.compare('20001211', undefined, colopt).should.equal(1)
    })

    it('should compare null date as epoch', () => {
      colopt.inputFormat = 'YYYYDDMM'
      dateType.compare(undefined, '20001211', colopt).should.equal(-1)
    })
  })

  describe('format', () => {
    it('should format dates correctly', () => {
      colopt.inputFormat = 'YYYYDDMM'
      colopt.outputFormat = 'Do MMM YYYY'
      dateType.format('20001012', colopt).should.equal('10th Dec 2000')
    })

    it('should format dates correctly', () => {
      colopt.inputFormat = 'YYYYMMDD'
      colopt.outputFormat = 'Do MMM YYYY'
      dateType.format('20001012', colopt).should.equal('12th Oct 2000')
    })
  })

  describe('filterPredicate', () => {
    it('should return true if values are the same', () => {
      dateType.filterPredicate('20001012', '20001211').should.equal(false)
    })
  })
})
