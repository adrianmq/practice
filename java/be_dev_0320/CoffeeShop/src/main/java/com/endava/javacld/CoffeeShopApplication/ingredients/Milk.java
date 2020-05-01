package com.endava.javacld.CoffeeShopApplication.ingredients;

import java.util.Map;

public class Milk extends Base {
  private final String NAME = "MILK";
  private static final Map<PREPARATION, Float> preparationMap =
      Map.of(PREPARATION.RAW, 1.0f, PREPARATION.FOAM, 1.5f, PREPARATION.STEAMED, 2.0f);

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
    return 10.0f;
  }

  @Override
  protected Map<PREPARATION, Float> getPreparationMap() {
    return preparationMap;
  }

  public Milk(float quantity) {
    super(quantity);
  }

  public Milk(float quantity, PREPARATION method) {
    super(quantity, method);
  }
}
