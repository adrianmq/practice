package ocp.se11.exam.ch7.pond.inland;

import ocp.se11.exam.ch7.pond.shore.Bird;

public class BirdWatcherFromAfar {
  public void watchBird() {
    Bird bird = new Bird();
//    bird.floatInWater(); // cannot access protected member from another package
//    System.out.println(bird.text); // cannot access protected field from another package
  }
}
