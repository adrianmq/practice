package com.endava.javacld.CoffeeShopApplication.ingredients;

public class Honey extends Base implements Ingredient {
  private static final String NAME = "HONEY";

  @Override
  public String getName() {
    return NAME.toLowerCase();
  }

  @Override
  protected float getBasePrice() {
    return 1.4f;
  }

  @Override
  protected float getBaseQuantity() {
    return 5.0f;
  }

  public Honey(float quantity) {
    super(quantity);
  }
}
