package com.pluralsight.inheritanceHiding;

public class Flight {
    // other members elided for clarity
    int seats = 150;
    int passengers;
    public void add1Passenger() {
        if (hasSeating())
            passengers += 1;
        else
            handleTooMany();
    }
    private boolean hasSeating() {
        return passengers < seats;
    }
    private void handleTooMany() {
        System.out.println("Too many passengers");
    }
}
