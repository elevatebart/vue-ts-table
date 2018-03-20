import { NumberType } from "./number";

export class DecimalType extends NumberType {
  format(value: any): string {
    return (Math.round(parseFloat(value) * 100) / 100).toFixed(2);
  }
}

export default new DecimalType();
