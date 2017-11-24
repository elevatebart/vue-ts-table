import percentageType from '@/components/types/percentage'
import { expect } from 'chai'

describe('percentage type', () => {
  describe('format', () => {
    it('should return the percentage formatted answer', () => {
      let x = '2'
      expect(percentageType.format(x)).to.equal('200.00%')
    })
  })
})
