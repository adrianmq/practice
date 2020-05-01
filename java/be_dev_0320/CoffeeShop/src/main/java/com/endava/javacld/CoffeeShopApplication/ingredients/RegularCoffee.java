package com.endava.javacld.CoffeeShopApplication.ingredients;

public class RegularCoffee extends Base implements Ingredient {
  private static final String NAME = "REGULAR COFFEE";

  @Override
  public String getName() {
    return NAME.toLowerCase();
  }

  @Override
  protected float getBasePrice() {
    return 0.75f;
  }

  @Override
  protected float getBaseQuantity() {
    return 10.0f;
  }

  public RegularCoffee(float quantity) {
    super(quantity);
  }
}
