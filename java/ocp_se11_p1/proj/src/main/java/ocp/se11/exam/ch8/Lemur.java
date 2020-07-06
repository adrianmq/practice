package ocp.se11.exam.ch8;

class Primate2 {
  public boolean hasHair() {
    return true;
  }
}

interface HasTail {
  public abstract boolean isTailStriped();
}

public class Lemur extends Primate2 implements HasTail {
  public boolean isTailStriped() {
    return false;
  }
  public int age = 10;
  public static void main(String[] args) {
    Lemur lemur = new Lemur();
    System.out.println(lemur.age);

    HasTail hasTail = lemur;
    System.out.println(hasTail.isTailStriped());

    Primate2 primate = lemur;
    System.out.println(primate.hasHair());

//    Lemur l = new Primate2(); // compile error
//    Lemur l = (Lemur) new Primate2(); // ClassCastException
    Primate2 p = new Primate2();
    if (p instanceof Lemur) { // won't return true 
      Lemur l = (Lemur) p;
    }
  }
}
