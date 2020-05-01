package com.endava.javacld.CoffeeShopApplication.ingredients;

import java.util.Map;

abstract class Base implements Ingredient {
  private float cost;
  private float quantity;
  private PREPARATION preparationMethod = PREPARATION.RAW;
  protected static final Map<PREPARATION, Float> preparationMap =
      Map.of(PREPARATION.RAW, 1.0f);

  private float getPreparationCostFactor() throws NullPointerException {
    return getPreparationMap().get(preparationMethod);
  }

  protected abstract float getBasePrice();

  protected abstract float getBaseQuantity();

  protected Map<PREPARATION, Float> getPreparationMap() {
    return preparationMap;
  }

  public boolean hasPreparation(PREPARATION method) {
    return getPreparationMap().containsKey(method);
  }

  public float getQuantity() {
    return quantity;
  }

  public float getCost() {
    return cost;
  }

  Base(float quantity) {
    this.quantity = quantity;
    this.calculateCost();
  }

  Base(float quantity, PREPARATION method) {
    this.quantity = quantity;
    this.preparationMethod = method;
    this.calculateCost();
  }

  private void calculateCost() {
    cost = getQuantity() / getBaseQuantity() * getBasePrice() * getPreparationCostFactor();
  }
}
