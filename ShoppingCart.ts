/*
  Item   Unit      Special
         Price     Price
  --------------------------
    A     50       3 for 130
    B     30       2 for 45
    C     20
    D     15
*/

const PRICING_RULES = [];

export class ShoppingCart {
  constructor() {}

  scan(sku: string): void {}

  getTotal(): number {
    return 0;
  }
}
