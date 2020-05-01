package com.endava.javacld.CoffeeShopApplication.ingredients;

public class Cinnamon extends Base implements Ingredient {
  private static final String NAME = "CINNAMON";

  @Override
  public String getName() {
    return NAME.toLowerCase();
  }

  @Override
  protected float getBasePrice() {
    return 0.5f;
  }

  @Override
  protected float getBaseQuantity() {
    return 5.0f;
  }

  public Cinnamon(float quantity) {
    super(quantity);
  }
}
