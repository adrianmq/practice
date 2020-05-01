package com.endava.javacld.CoffeeShopApplication;

import com.endava.javacld.CoffeeShopApplication.accountancy.Orders;
import com.endava.javacld.CoffeeShopApplication.beverages.Menu;
import com.endava.javacld.CoffeeShopApplication.order.Order;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Date;

public class Main {
  private static final String name = "Coffee.Main";
  private static BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));

  public static void main(String[] args) {
    System.out.println(" Welcome to " + name + "!");
    System.out.printf(" See below our menu for %1$td-%1$tm-%1$ty\n", new Date());
    Menu.display();

    System.out.println(" Please enter your name:");
    String customerName = readCustomerName();

    System.out.println(" Where would you like to serve your order, pick-up[1] or to-go[2]?");
    Order.ServingPlace customerServingPlace = readCustomerServingPlace();

    System.out.println(
        " Please select the product number."
            + " For choosing multiple products, separate them using a comma ','.\n"
            + " Waiting for your order...");
    ArrayList<Integer> itemsSelected = readCustomerOrder();
    if (itemsSelected.isEmpty()) {
      closeInputReader();
      return;
    }

    Order order = new Order(customerName, Menu.getItems(itemsSelected), customerServingPlace);
    System.out.println(" Your order is: ");
    order.prepare().display();
    System.out.println(" Enjoy!");
    System.out.println();

    Orders.register(order);
    System.out.println(" Current " + name + " finance report: ");
    System.out.println(" " + Orders.getReport());

    closeInputReader();
  }

  private static String readCustomerName() {
    String defaultName = "customer";
    String name = readCustomerInput();
    if (name.isBlank()) {
      name = defaultName;
    }
    return name;
  }

  private static Order.ServingPlace readCustomerServingPlace() {
    Order.ServingPlace servingPlace = Order.ServingPlace.PICK_UP;
    String option = readCustomerInput();
    try {
      int optionNr = Integer.valueOf(option);
      servingPlace = Order.ServingPlace.values()[optionNr - 1];
    } catch (NumberFormatException | ArrayIndexOutOfBoundsException e) {
      System.out.println(" <Warning>: Option is invalid " + option);
    } catch (Exception e) {
      System.out.println(e.getClass() + ": " + e.getMessage());
      e.printStackTrace();
    }
    return servingPlace;
  }

  private static ArrayList<Integer> readCustomerOrder() {
    String[] itemsStr = readCustomerInput().split(",");
    ArrayList<Integer> itemIdxs = new ArrayList<>();
    for (String item : itemsStr) {
      try {
        int itemIdx = Integer.valueOf(item);
        if (itemIdx < 1 || itemIdx > Menu.BeverageEnum.values().length)
          System.out.println(" <Warning>: Item number is not in menu " + itemIdx);
        else itemIdxs.add(itemIdx);
      } catch (NumberFormatException e) {
        System.out.println(" <Warning>: Item number is invalid " + item);
      }
    }
    return itemIdxs;
  }

  private static String readCustomerInput() {
    String inputLine = "";
    try {
      inputLine = reader.readLine();
    } catch (IOException e) {
      System.out.println(e.getClass() + ": " + e.getMessage());
    } catch (Exception e) {
      System.out.println(e.getClass() + ": " + e.getMessage());
      e.printStackTrace();
    }
    return inputLine;
  }

  private static void closeInputReader() {
    try {
      if (reader != null) {
        reader.close();
        reader = null;
      }
    } catch (IOException e) {
      System.out.println(e.getClass() + ": " + e.getMessage());
      e.printStackTrace();
    }
  }
}
