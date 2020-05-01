package com.endava.javacld.CoffeeShopApplication.ingredients;

public interface Ingredient {
  enum PREPARATION {
    RAW, FOAM, STEAMED
  }

  String getName();

  float getQuantity();

  float getCost();

  boolean hasPreparation(PREPARATION method);
}
