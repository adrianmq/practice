package ocp.se11.exam.ch7.pond.swan;

import ocp.se11.exam.ch7.pond.shore.Bird; // from other package

public class Swan extends Bird {
  public void swim() {
    floatInWater(); // subclass access to superclass protected member
    System.out.println(text); // subclass access to superclass protected field
  }
  public void helpOtherSwanSwim() {
    Swan other = new Swan();
    other.floatInWater();
    System.out.println(other.text);
  }
  public void helpOtherBirdSwim() {
    Bird other = new Bird();
//    other.floatInWater(); // though superclass, access to protected not allowed
//    System.out.println(other.text); // though superclass, access to protected not allowed
  }
}
