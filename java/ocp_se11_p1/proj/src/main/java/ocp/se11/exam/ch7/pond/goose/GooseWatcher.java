package ocp.se11.exam.ch7.pond.goose;

//import ocp.se11.exam.ch7.pond.goose.Goose;

public class GooseWatcher {
  public void watch() {
    Goose goose = new Goose();
    // we're not in the goose object (class)
    // the floatInWater is declared in Bird.GooseWatcher, is not in the same package as Bird
    // nor does it extend Bird.Goose extends Bird,
    // that lets Goose refer to floatInWater, and not callers of Goose
//    goose.floatInWater(); // DOES NOT COMPILE
  }

  public void voidWithReturn() {
    return;
  }
}
