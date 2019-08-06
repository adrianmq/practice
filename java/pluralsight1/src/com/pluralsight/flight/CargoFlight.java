package com.pluralsight.flight;

import java.io.FileNotFoundException;

public class CargoFlight extends Flight {
    float maxCargoSpace = 1000.0f;
    float usedCargoSpace;
    // int seats = 12;

    @Override
    int getSeats() {
        return 12;
    }

    public CargoFlight(int flightNumber) {
        super(flightNumber);
    }

    public CargoFlight(int flightNumber, float maxCargoSpace) {
        this(flightNumber);
        this.maxCargoSpace = maxCargoSpace;
    }

    public CargoFlight() {
    }

    public CargoFlight(float maxCargoSpace) {
        this.maxCargoSpace = maxCargoSpace;
    }

    public final void add1Package(float h, float w, float d) {
        float size = h * w * d;
        if (hasCargoSpace(size))
            usedCargoSpace += size;
        else
            handleNoSpace();
    }

//    public void add1Passenger() {
//        // System.out.println("add1Passenger in flight with seats: " + this.seats);
//        super.add1Passenger();
//    }
//
//    private boolean hasSeating(int count) {
//        System.out.println("hasSeating in flight with seats: " + this.getSeats());
//        return super.passengers + count <= this.getSeats();
//    }

    @Override
    public void addPassengers(String filename) throws FileNotFoundException {
        // ...
    }

    private boolean hasCargoSpace(float size) {
        return usedCargoSpace + size <= maxCargoSpace;
    }

    private void handleNoSpace() {
        System.out.println("Not enough space");
    }
}
