import dateType from '../../../../src/components/types/date'
import { expect } from 'chai'
import { ColumnOptions } from 'components/table'

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
      expect(dateType.compare('20001211', '20001112')).to.equal(1)
    })

    it('should compare dates correctly with custom format', () => {
      colopt.inputFormat = 'YYYYDDMM'
      expect(dateType.compare('20001211', '20001112', colopt)).to.equal(-1)
    })

    it('should compare null date as epoch', () => {
      colopt.inputFormat = 'YYYYDDMM'
      expect(dateType.compare('20001211', undefined, colopt)).to.equal(1)
    })

    it('should compare null date as epoch', () => {
      colopt.inputFormat = 'YYYYDDMM'
      expect(dateType.compare(undefined, '20001211', colopt)).to.equal(-1)
    })
  })

  describe('format', () => {
    it('should format dates correctly', () => {
      colopt.inputFormat = 'YYYYDDMM'
      colopt.outputFormat = 'Do MMM YYYY'
      expect(dateType.format('20001012', colopt)).to.equal('10th Dec 2000')
    })

    it('should format dates correctly', () => {
      colopt.inputFormat = 'YYYYMMDD'
      colopt.outputFormat = 'Do MMM YYYY'
      expect(dateType.format('20001012', colopt)).to.equal('12th Oct 2000')
    })
  })
})
