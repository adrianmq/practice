package com.endava.javacld.CoffeeShopApplication.beverages;

import com.endava.javacld.CoffeeShopApplication.ingredients.Milk;
import com.endava.javacld.CoffeeShopApplication.ingredients.Ingredient;
import com.endava.javacld.CoffeeShopApplication.ingredients.RegularCoffee;

public class Machiatto extends Base implements Beverage {
  private static final String ID = "MACHIATTO";
  private final float price = 7.5f;

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
    addIngredient(new Milk(20, Ingredient.PREPARATION.FOAM));
  }
}
