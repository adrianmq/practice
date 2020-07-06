package ocp.se11.exam.ch7.pond.swan;

import ocp.se11.exam.ch7.pond.duck.MotherDuck;

public class BadCygnet {
  public void makeNoise() {
    MotherDuck duck = new MotherDuck();
//    duck.quack(); // cannot access having default access modifier
//    System.out.println(duck.noise); // cannot access having default access modifier
  }
}
