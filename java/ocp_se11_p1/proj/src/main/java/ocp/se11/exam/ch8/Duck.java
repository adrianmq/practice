package ocp.se11.exam.ch8;

public class Duck {
  private String color;
  private int height;
  private int length;

  public void setData(int length, int theHeight) {
    this.length = length;
    height = theHeight;
    this.color = "white";
  }

  public static void main(String[] args) {
    Duck b = new Duck();
    b.setData(1,2);
    System.out.println(b.length + " " + b.height + " " + b.color);
  }
}
