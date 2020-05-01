package com.endava.javacld.CoffeeShopApplication.beverages;

import com.endava.javacld.CoffeeShopApplication.ingredients.Ingredient;

import java.util.ArrayList;

abstract class Base implements Beverage {
  private String customerName;
  private ArrayList<Ingredient> ingredients = new ArrayList<>();
  private boolean isReady = false;
  private float cost = 0.0f;

  public abstract String getId();

  public abstract float getPrice();

  protected abstract void prepare();

  public float getCost() {
    return cost;
  }

  public String getName() {
    return getId().toLowerCase();
  }

  public boolean isReady() {
    return isReady;
  }

  public Beverage build(String customerName) {
    this.setCustomerName(customerName);
    this.prepare();
    isReady = true;
    return this;
  }

  @Override
  public String toString() {
    StringBuilder titleBuilder = new StringBuilder(getName().length());
    String[] words = getName().split(" ");
    int i = 0;
    for (String word : words) {
      titleBuilder.append(word.substring(0, 1).toUpperCase()).append(word.substring(1).toLowerCase());
      if (i++ < words.length - 1) {
        titleBuilder.append(" ");
      }
    }
    return titleBuilder.toString();
  }

  private void setCustomerName(String customerName) {
    this.customerName = customerName;
  }

  void addIngredient(Ingredient ingredient) {
    updateCost(ingredient.getCost());
    ingredients.add(ingredient);
  }

  private void updateCost(float cost) {
    this.cost += cost;
  }
}
