package ocp.se11.exam.ch7.pond.duck;

public class FatherDuck {
  private String noise = "quack";
  private void quack() {
    System.out.println(noise);
  }
  private void makeNoise() {
    quack();
  }
}
