package ocp.se11.exam.ch8;

class Mammal {
  String type = "mammal";
}

public class Bat extends Mammal {
  String type = "bat";
  public String getType() {
    return super.type + ":" + this.type;
  }
  public static void main(String[] args) {
    System.out.println(new Bat().getType());
  }
}