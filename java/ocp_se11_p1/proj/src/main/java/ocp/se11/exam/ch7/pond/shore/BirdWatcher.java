package ocp.se11.exam.ch7.pond.shore;

public class BirdWatcher {
  public void watchBird() {
    Bird bird = new Bird();
    bird.floatInWater(); // calling protected member
    System.out.println(bird.text); // accessing protected member
  }
}
