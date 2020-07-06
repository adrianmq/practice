package ocp.se11.exam.ch8;

class Fish {
  protected int size;
  private int age;
  public Fish(int age) {
    this.age = age;
  }
  public int getAge() {
    return age;
  }
}

public class Shark extends Fish {
  private int numberOfFins = 8;

  public Shark(int age) {
    super(age);
    this.size = 4;
  }

//  public void displaySharkDetails() {
//    System.out.print("Shark with age: "+getAge());
//    System.out.print(" and "+size+" meters long");
//    System.out.print(" with "+numberOfFins+" fins");
//  }

  public void displaySharkDetails() {
    System.out.print("Shark with age: "+super.getAge());
    System.out.print(" and "+super.size+" meters long");
    System.out.print(" with "+this.numberOfFins+" fins");
  }
}
