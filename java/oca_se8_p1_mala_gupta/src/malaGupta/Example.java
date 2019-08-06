//package malaGupta;

import malaGupta.*; // All classes and interfaces defined in this package are available here

interface ExampleInterface {
    void changeChannel(int channelNumber);
    void increaseVolume();
    void decreaseVolume();
}

// cannot have class && interface with the same name (duplicate ERROR)
// class Example {}
// cannot have public class/interface with different name than file name
// public class ExampleDiff {}

public interface Example {
    //..
}

// Fails to compile given that interface name is not the same with file name
//public interface Printable {
//    int printers = 0;
//}

interface Movable {
    boolean isMovable = false;
}

