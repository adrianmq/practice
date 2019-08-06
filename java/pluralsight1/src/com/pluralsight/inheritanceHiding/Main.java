package com.pluralsight.inheritanceHiding;

public class Main {
    public static void main(String[] args) {
        Flight f1 = new Flight();
        System.out.println(f1.seats); // 150

        CargoFlight cf = new CargoFlight();
        System.out.println(cf.seats); // 12

        // Reference type Flight, doesn't know about the 12 value
        Flight f2 = new CargoFlight();
        System.out.println(f2.seats); // 150

//        f2.add1Passenger();
//        cf.add1Passenger(); // will perform the hasSeating check using the 150 seats value
    }
}
