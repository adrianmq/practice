package com.endava.javacld.CoffeeShopApplication.beverages;

import com.endava.javacld.CoffeeShopApplication.ingredients.BlackCoffee;
import com.endava.javacld.CoffeeShopApplication.ingredients.Milk;
import com.endava.javacld.CoffeeShopApplication.ingredients.Cinnamon;
import com.endava.javacld.CoffeeShopApplication.ingredients.Honey;
import com.endava.javacld.CoffeeShopApplication.ingredients.Ingredient;

public class Miel extends Base implements Beverage {
  private static final String ID = "COFFEE MIEL";
  private final float price = 12.0f;

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
    addIngredient(new BlackCoffee(50));
    addIngredient(new Honey(10));
    addIngredient(new Cinnamon(10));
    addIngredient(new Milk(10, Ingredient.PREPARATION.STEAMED));
  }
}
