import * as moment from 'moment'
import { Moment } from 'moment'
import { AbstractType, ColumnOptions } from '@/components/table'

function cook (d: string, column?: ColumnOptions): Moment {
  if (column && column.inputFormat) {
    return moment(d, column.inputFormat)
  } else {
    return moment(d)
  }
}

export class DateType implements AbstractType {
  isRight: boolean = true

  format (value: any, column: ColumnOptions): string {
    // convert to date
    let date = moment(value, column.inputFormat)
    return date.format(column.outputFormat)
  }

  compare (x: any, y: any, column?: ColumnOptions): number {
    let xm = cook(x + '', column)
    let ym = cook(y + '', column)
    if (!xm.isValid()) {
      return -1
    }
    if (!ym.isValid()) {
      return 1
    }
    return xm.isAfter(ym) ? 1 : -1
  }

  filterPredicate (rowval: any, filter: string): boolean {
    return rowval === filter
  }
}

export default new DateType()
