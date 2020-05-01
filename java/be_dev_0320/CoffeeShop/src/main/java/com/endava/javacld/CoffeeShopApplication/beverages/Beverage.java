package com.endava.javacld.CoffeeShopApplication.beverages;

public interface Beverage {
  enum Type {
    STANDARD,
    CUSTOM
  };

  String getId();

  String getName();

  float getPrice();

  float getCost();

  boolean isReady();

  Beverage build(String customerName);

  @Override
  String toString();
}
