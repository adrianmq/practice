package ocp.se11.exam.ch7.pond.goose;

import ocp.se11.exam.ch7.pond.shore.Bird;

public class Goose extends Bird {
  public void helpGooseSwim() {
    Goose other = new Goose();
    other.floatInWater();
    System.out.println(other.text);
  }
  public void helpOtherGooseSwim() {
    Bird other = new Goose();
//    other.floatInWater(); // direct type reference to protected member from other package
//    System.out.println(other.text);
  }
}
