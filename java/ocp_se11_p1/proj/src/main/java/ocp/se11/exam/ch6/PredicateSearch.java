package ocp.se11.exam.ch6;

import java.util.*;
import java.util.function.*;

public class PredicateSearch {
  public static void main(String[] args) {
    Consumer<String> consumer = x -> System.out.println(x);
    Supplier<Integer> number = () -> 42;
    Comparator<Integer> ints = (i1, i2) -> i1 - i2; //ascending
    Comparator<String> strs = (s1, s2) -> s2.compareTo(s1); //descending
    Comparator<String> strs2 = (s1, s2) -> - s1.compareTo(s2); //descending

    List<Animal> animals = new ArrayList<Animal>();
    animals.add(new Animal("fish", false, true));
    animals.add(new Animal("kangaroo", true, false));
    animals.add(new Animal("rabbit", true, false));
    animals.add(new Animal("turtle", false, true));

    print(consumer, "Hello World");
    print(animals, a -> a.canHop());
    print(animals, a -> a.canSwim());
    System.out.println(returnNumber(number));
    System.out.println(ints.compare(1, 2) + " 1,2 asc");
    System.out.println(strs.compare("a", "b") + " a,b desc");
    System.out.println(strs2.compare("a", "b") + " a,b desc");
    System.out.println(strs2.compare("a", "c") + " a,c desc");
    apis();

//    Set<String> set = Set.of("mickey", "minnie");
//    List<String> list = new ArrayList<>(set);
//    list = null; // runtime error
//    list.removeIf(c -> c.equals(""));
  }
  private static void print(List<Animal> animals, Predicate<Animal> checker) {
    for (Animal animal: animals) {
      if (checker.test(animal))
        System.out.print(animal + " ");
    }
    System.out.println();
  }
  private static void print(Consumer<String> consumer, String value) {
    consumer.accept(value);
  }
  private static int returnNumber(Supplier<Integer> supplier) {
    return supplier.get();
  }
  private static void apis() {
    List<String> bunnies = new ArrayList<>();
    bunnies.add("long ear");
    bunnies.add("hip");
    bunnies.add("floppy");
    bunnies.add("hoppy");
    System.out.println(bunnies);
    bunnies.sort((b1, b2) -> b1.compareTo(b2));
    System.out.println(bunnies);
    // lists || sets support removeIf
    // removes any values in the list/set that match the Predicate
    bunnies.removeIf(s -> s.charAt(0) != 'h');
    bunnies.forEach(b -> System.out.println(b));
    System.out.println(bunnies);

    Set<String> bunniesSet = Set.of("long ear", "floppy", "hoppy");
    bunniesSet.forEach(b -> System.out.println(b));

    Map<String, Integer> bunniesMap = new HashMap<>();
    bunniesMap.put("long ear", 3);
    bunniesMap.put("floppy", 8);
    bunniesMap.put("hoppy", 1);
    bunniesMap.keySet().forEach(b -> System.out.println(b));
    bunniesMap.values().forEach(b -> System.out.println(b));
    isIt("a", "ds");
  }

  private static void isIt(String param1, String param2) {
    String local1 = param1 + param2;
    String local2 = param1 + param2;
    param1 = null;
    local2 = null;
    System.out.println(local1 +""+ param1);
    method();
  }

//  int x = 1; // permitted
  public static void method() {
    // int x = 1; // error: already defined in scope
    x((var x) -> { System.out.println(x);
    }, (var x, var y) -> 0);
  }

  public static void x(Consumer<String> x, Comparator<Boolean> y) {
    x.accept("asdkfjha");
  }
}
