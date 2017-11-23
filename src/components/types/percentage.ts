import { AbstractType, ColumnOptions } from 'components/table'
import { NumberType } from './number'

export class PercentageType extends NumberType {
  format (value: any): string {
    return (parseFloat(value) * 100).toFixed(2) + '%'
  }
}

export default new PercentageType()
