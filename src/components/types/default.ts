import { AbstractType, ColumnOptions } from '@/components/table'

export class DefaultType implements AbstractType {
  isRight: false

  format (value: any): string {
    return value.toString()
  }

  compare (x: any, y: any): number {
    function cook (d: any) {
      return d.toLowerCase()
    }
    x = cook(x)
    y = cook(y)
    return (x < y ? -1 : (x > y ? 1 : 0))
  }

  filterPredicate (rowval: any, filter: string): boolean {
    let v = rowval
    .toLowerCase()
    .startsWith(
      (filter).toLowerCase()
    )
    return v
  }
}

export default new DefaultType()
