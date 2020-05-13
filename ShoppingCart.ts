/*
  Item   Unit      Special
         Price     Price
  --------------------------
    A     50       3 for 130
    B     30       2 for 45
    C     20
    D     15
*/

type PricingRule = {
  sku: string;
  unitPrice: number;
  promotion?: (p: PricingRule[]) => PricingRule | undefined;
};

const promotionCreator = (
  appliedTo: PricingRule,
  multiBuy: PricingRule,
  multibuyAmount: number
) => (cart: PricingRule[]): PricingRule | undefined => {
  const nUndiscountedItems = cart.reduce((collected, item) => {
    if (item.sku === appliedTo.sku) {
      return collected + 1;
    }
    if (item.sku === multiBuy.sku) {
      return collected - multibuyAmount;
    }
    return collected;
  }, 0);
  return nUndiscountedItems >= multibuyAmount ? multiBuy : undefined;
};

const A = {
  sku: "A",
  unitPrice: 50,
};

const AMultibuy: PricingRule = {
  sku: "AMultibuy",
  unitPrice: -20,
};
AMultibuy.promotion = promotionCreator(A, AMultibuy, 3);

const B = {
  sku: "B",
  unitPrice: 30,
};

const BMultibuy: PricingRule = {
  sku: "BMultibuy",
  unitPrice: -15,
};
BMultibuy.promotion = promotionCreator(B, BMultibuy, 2);

const PRICING_RULES: { [key: string]: PricingRule } = {
  A,
  B,
  C: { sku: "C", unitPrice: 20 },
  D: { sku: "D", unitPrice: 15 },
  AMultibuy,
  BMultibuy,
};
export class ShoppingCart {
  private scannedItems: Array<PricingRule> = [];
  constructor() {}

  scan(sku: string): void {
    this.scannedItems.push(PRICING_RULES[sku]);
    const promotions = Object.keys(PRICING_RULES)
      .map((key) => PRICING_RULES[key].promotion)
      .filter(Boolean);
    promotions.forEach((promotion) => {
      const returnedPromotionalItem = promotion!(this.scannedItems);
      if (returnedPromotionalItem) {
        this.scannedItems.push(returnedPromotionalItem);
      }
    });
  }

  getTotal(): number {
    return this.scannedItems.reduce((acc, cur) => acc + cur.unitPrice, 0);
  }
}
