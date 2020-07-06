package ocp.se11.exam.ch8;

class Bird {
  public void fly() {
    System.out.println("Bird is flying");
  }
  public void eat(int food) {
    System.out.println("Bird is eating "+food+" units of food");
  }
}

public class Eagle extends Bird {
  public int fly(int height) { // overloaded
    System.out.println("Bird is flying at "+height+" meters");
    return height;
  }
//  public int eat(int food) { // int not subtype of void --> COMPILE ERROR
  public void eat(int food) { // int not subtype of void --> COMPILE ERROR
    System.out.println("Bird is eating "+food+" units of food");
//    return food;
    return;
  }
}
