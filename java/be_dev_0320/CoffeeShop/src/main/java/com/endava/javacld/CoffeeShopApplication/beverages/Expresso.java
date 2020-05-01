package com.endava.javacld.CoffeeShopApplication.beverages;

import com.endava.javacld.CoffeeShopApplication.ingredients.RegularCoffee;

public class Expresso extends Base implements Beverage {
  private static final String ID = "EXPRESSO";
  private final float price = 5.0f;

  @Override
  public String getId() {
    return ID;
  }

  @Override
  public float getPrice() {
    return price;
  }

  @Override
  protected void prepare() {
    addIngredient(new RegularCoffee(50));
  }
}
