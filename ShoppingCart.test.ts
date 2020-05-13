//http://codekata.com/kata/kata09-back-to-the-checkout/

import { ShoppingCart } from "./ShoppingCart";

function price(products: string) {
  const shoppingCart = new ShoppingCart();
  products.split("").forEach((sku) => shoppingCart.scan(sku));
  return shoppingCart.getTotal();
}

describe("Shopping Cart", () => {
  it("calculate shopping price", () => {
    expect(price("A")).toEqual(50);
    expect(price("AB")).toEqual(80);
    expect(price("CDBA")).toEqual(115);
    expect(price("AA")).toEqual(100);
    expect(price("AAA")).toEqual(130);
    expect(price("AAAA")).toEqual(180);
    expect(price("AAAAA")).toEqual(230);
    expect(price("AAAAAA")).toEqual(260);
    expect(price("AAAB")).toEqual(160);
    expect(price("AAABB")).toEqual(175);
    expect(price("AAABBD")).toEqual(190);
    expect(price("DABABA")).toEqual(190);
  });

  it("should return I's when passed a number less than 4", () => {
    const shoppingCart = new ShoppingCart();

    expect(shoppingCart.getTotal()).toEqual(0);
    shoppingCart.scan("A");
    expect(shoppingCart.getTotal()).toEqual(50);
    shoppingCart.scan("B");
    expect(shoppingCart.getTotal()).toEqual(80);
    shoppingCart.scan("A");
    expect(shoppingCart.getTotal()).toEqual(130);
    shoppingCart.scan("A");
    expect(shoppingCart.getTotal()).toEqual(160);
    shoppingCart.scan("B");
    expect(shoppingCart.getTotal()).toEqual(175);
  });
});
