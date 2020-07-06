package ocp.se11.exam.ch8;

public class Animal {
  private int age;
  protected String name;
  public Animal() {
    super();
  }
  public Animal(int age) {
    super(); // refers to constructor in java.lang.Object
    this.age = age;
    this.name = null;
  }
  public Animal(int age, String name) {
    super();
    this.age = age;
    this.name = name;
  }
  public int getAge() {
    return age;
  }
  public void setAge(int newAge) {
    age = newAge;
  }
}
