package com.endava.javacld.CoffeeShopApplication.order;

import com.endava.javacld.CoffeeShopApplication.beverages.Beverage;

import java.util.ArrayList;

public class Order {
  public enum ServingPlace {
    PICK_UP,
    TO_GO,
  }

  private String customerName;
  private ArrayList<Beverage> products;
  private ServingPlace servingPlace;
  private float totalCost = 0.0f;
  private float totalPrice = 0.0f;

  public Order(String customerName, ArrayList<Beverage> products, ServingPlace servingPlace) {
    this.customerName = customerName;
    this.products = products;
    this.servingPlace = servingPlace;
  }

  public ServingPlace getServingPlace() {
    return servingPlace;
  }

  public Order prepare() {
    for (Beverage product : products) {
      prepareProduct(product);
      totalCost += product.getCost();
      totalPrice += product.getPrice();
    }
    return this;
  }

  public float getCost() {
    return totalCost;
  }

  public float getTotal() {
    return totalPrice;
  }

  public void display() {
    int productNr = 0;
    for (Beverage product : products) {
      prepareProduct(product);
      System.out.printf(" %1d.%15s%15.2f%15s\n", ++productNr, product, product.getPrice(), "RON");
    }
    System.out.printf(" %17s%15.2f%15s\n", "TOTAL:", getTotal(), "RON");
  }

  private void prepareProduct(Beverage product) {
    if (!product.isReady()) product.build(customerName);
  }
}
