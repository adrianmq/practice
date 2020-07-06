package ocp.se11.exam;

import java.util.ArrayList;
import java.util.List;

public class Entrypoint {
  public static void main(String[] args) {
    System.out.println("OCP Practice");
    switchOddDefaultNonMatch();

    for(var p : new int[2])
      System.out.println(p);
    for(var p : new Character[3])
      System.out.println(p);
    List parrots = new ArrayList();
    for(var p : parrots)
      System.out.println(p);

    char[] wolf = {'W', 'e', 'b', 'b', 'y'};
    int q = wolf.length;
    for (; ; ) {
      System.out.print(wolf[--q]);
      if (q == 0) break;
    }
  }

  private static void switchOddDefaultNonMatch() {
    var dayOfWeek = 5;
    switch (dayOfWeek) {
      case 0:
        System.out.println("Sunday");
        break;
      default:
        System.out.println("Weekday");
//        break;
      case 6:
        System.out.println("Saturday");
      break;
    }
  }
}
