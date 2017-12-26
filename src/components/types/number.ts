import { AbstractType } from '@/components/table'

function cook (d: string) {
  return d.indexOf('.') >= 0 ? parseFloat(d) : parseInt(d, 10)
}

export class NumberType implements AbstractType {
  isRight: boolean = true
  format (value: any): string {
    return value.toString()
  }

  compare (x: any, y: any): number {
    x = typeof x === 'number' ? x : cook(x)
    y = typeof y === 'number' ? y : cook(y)
    return (x < y ? -1 : (x > y ? 1 : 0))
  }

  filterPredicate (rowval: any, filter: string): boolean {
    return cook(rowval.toString()) === cook(filter)
  }
}

export default new NumberType()
