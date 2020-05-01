package com.endava.javacld.CoffeeShopApplication.beverages;

import com.endava.javacld.CoffeeShopApplication.ingredients.Milk;
import com.endava.javacld.CoffeeShopApplication.ingredients.Ingredient;
import com.endava.javacld.CoffeeShopApplication.ingredients.RegularCoffee;

public class Latte extends Base implements Beverage {
  private static final String ID = "COFFEE LATTE";
  private final float price = 8.0f;

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
    addIngredient(new RegularCoffee(30));
    addIngredient(new Milk(20, Ingredient.PREPARATION.STEAMED));
    addIngredient(new Milk(10, Ingredient.PREPARATION.FOAM));
  }
}
