package ocp.se11.exam.ch7.pond.duck;

public class BadDuckling {
  public void makeNoise() {
    FatherDuck duck = new FatherDuck();
//    duck.quack(); // private access not allowed
//    System.out.println(duck.noise); // private access not allowed
  }
}
