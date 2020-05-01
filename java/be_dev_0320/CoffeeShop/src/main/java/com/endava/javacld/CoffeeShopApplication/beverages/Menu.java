package com.endava.javacld.CoffeeShopApplication.beverages;

import java.util.ArrayList;

public class Menu {
  public enum BeverageEnum {
    Cappuccino,
    Expresso,
    Latte,
    Machiatto,
    Miel
  }

  private static ArrayList<Beverage> itemsList = new ArrayList<>();

  static {
    for (BeverageEnum itemClassName : BeverageEnum.values()) {
      itemsList.add(createItem(itemClassName));
    }
  }

  private static Beverage createItem(BeverageEnum className) {
    Beverage newItem = null;
    try {
      Class itemClass = Class.forName(Menu.class.getPackageName() + "." + className);
      newItem = (Beverage) itemClass.getConstructor().newInstance();
    } catch (Exception e) {
      e.printStackTrace();
    }
    return newItem;
  }

  public static ArrayList<Beverage> getItems(ArrayList<Integer> itemNumbers) {
    ArrayList<Beverage> items = new ArrayList<>();
    for (int itemNumber : itemNumbers) {
      BeverageEnum itemClassName = BeverageEnum.values()[itemNumber - 1];
      items.add(createItem(itemClassName));
    }
    return items;
  }

  public static void display() {
    int itemNr = 0;
    for (Beverage item : itemsList) {
      System.out.printf(" %1d.%15s%15.2f%15s\n", ++itemNr, item, item.getPrice(), "RON");
    }
  }
}
