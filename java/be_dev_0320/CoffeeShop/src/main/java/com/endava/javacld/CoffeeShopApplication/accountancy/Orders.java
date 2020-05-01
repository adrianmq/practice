package com.endava.javacld.CoffeeShopApplication.accountancy;

import com.endava.javacld.CoffeeShopApplication.order.Order;

import java.util.ArrayList;
import java.util.EnumMap;

public class Orders {
  private static ArrayList<Order> list = new ArrayList<>();
  private static EnumMap<Report, Float> report =
      new EnumMap<>(Report.class) {
        {
          put(Report.COST, 0.0f);
          put(Report.INCOME, 0.0f);
          put(Report.PROFIT, 0.0f);
        }
      };

  enum Report {
    COST,
    INCOME,
    PROFIT
  }

  public static void register(Order order) {
    list.add(order);
    updateReport(order);
  }

  public static EnumMap<Report, Float> getReport() {
    return report;
  }

  private static void updateReport(Order order) {
    report.put(Report.COST, report.get(Report.COST) + order.getCost());
    report.put(Report.INCOME, report.get(Report.INCOME) + order.getTotal());
    report.put(Report.PROFIT, report.get(Report.INCOME) - report.get(Report.COST));
  }
}
