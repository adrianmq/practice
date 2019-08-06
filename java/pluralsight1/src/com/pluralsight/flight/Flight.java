/*
 * Field initializers
 * Initialization blocks
 * Multiple constructors
 * Method overloading
 */

package com.pluralsight.flight;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Iterator;

public class Flight
        implements Comparable<Flight>, Iterable<Person> {
    int passengers;
    //    int seats = 150;
    private int seats;
    static final int MAX_FAA_SEATS = 550;
    static int allPassengers;

    static int getAllPassengers() {
        return allPassengers;
    }

    public static void resetAllPassengers() {
        allPassengers = 0;
    }

    int getSeats() {
        return 150;
    }

    private int flightNumber;
    private char flightClass;
    private int flightTime;
    private CrewMember[] crew;
    private Passenger[] roster;
    private boolean[] isSeatAvailable;
    private int totalCheckedBags;
    private int maxCarryOns = getSeats() * 2, totalCarryOns;

    {
        int seats = this.getSeats();
        isSeatAvailable = new boolean[seats];
        for (int i = 0; i < seats; i++)
            isSeatAvailable[i] = true;
    }

    public Flight() {
    }

    public Flight(int flightNumber) {
        this.flightNumber = flightNumber;
    }

    public Flight(char flightClass) {
        this.flightClass = flightClass;
    }

    public void setSeats(int seats) {
        if (seats <= MAX_FAA_SEATS)
            this.seats = seats;
        else
            System.out.println("Exceeded maximum number of seats");
    }

    public void setFlightTime(int flightTime) {
        this.flightTime = flightTime;
    }

    public int getFlightTime() {
        return flightTime;
    }

    public void addPassengers(String filename) throws IOException {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader(filename));
            String line = null;
            int count = 0;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(" ");
                passengers += Integer.valueOf(parts[0]);
            }
        } finally {
            if (reader != null) {
                reader.close();
            }
        }
    }

    public void addCrew(CrewMember... list) {
        this.crew = new CrewMember[list.length];
        for (int i = 0; i < list.length; i++)
            this.crew[i] = list[i];
    }

    // public void addPassengers(Passenger[] list) {
    public void addPassengers(Passenger... list) {
        if (this.hasSeating(list.length)) {
            int count = 0;
            this.roster = new Passenger[list.length];
            this.passengers += list.length;
            for (Passenger passenger : list) {
                totalCheckedBags += passenger.getCheckedBags();
                roster[count] = passenger;
                count++;
            }
        } else
            this.handleTooMany();
    }

    public void add1Passenger() {
        System.out.println("add1Passenger in flight with seats: " + this.getSeats());
        if (this.hasSeating()) {
            this.passengers += 1;
            this.allPassengers += 1;
        } else
            this.handleTooMany();
    }

    public void add1Passenger(int bags) {
        if (this.hasSeating()) {
            this.add1Passenger();
            this.totalCheckedBags += bags;
        }
    }

    public void add1Passenger(Passenger p) {
        this.add1Passenger(p.getCheckedBags());
    }

    public void add1Passenger(int bags, int carryOns) {
        if (this.hasSeating() && this.hasCarryOnSpace(carryOns)) {
            this.add1Passenger(bags);
            this.totalCarryOns += carryOns;
        }
    }

    public void add1Passenger(Passenger p, int carryOns) {
        this.add1Passenger(p.getCheckedBags(), carryOns);
    }

    private boolean hasSeating() {
        return this.passengers < this.getSeats();
    }

    private boolean hasSeating(int count) {
        return this.passengers + count <= this.getSeats();
    }

    private boolean hasCarryOnSpace(int carryOns) {
        return this.totalCarryOns + carryOns <= this.maxCarryOns;
    }

    private void handleTooMany() {
        System.out.println("Too many passengers");
    }

    public int getPassengers() {
        return this.passengers;
    }

    @Override
    public boolean equals(Object o) {
        if (super.equals(o))
            return true;
        if (!(o instanceof Flight))
            return false;
        Flight other = (Flight) o;
        return
                flightNumber == other.flightNumber &&
                        flightClass == other.flightClass;
    }

    public int compareTo(Flight f) {
        return flightTime - f.flightTime;
    }

    public Iterator<Person> iterator() {
        // return new FlightIterator();
        return new Iterator<Person>() {
            private int index = 0;

            public boolean hasNext() {
                return index < (crew.length + roster.length);
            }

            public Person next() {
                Person p = (index < crew.length)
                        ? crew[index]
                        : roster[index - crew.length];
                index++;
                return p;
            }
        };
    }

    private class FlightIterator implements Iterator<Person> {
        private int index = 0;

        public boolean hasNext() {
            return index < (crew.length + roster.length);
        }

        public Person next() {
            Person p = (index < crew.length)
                    ? crew[index]
                    : roster[index - crew.length];
            index++;
            return p;
        }
    }

    @Override
    public String toString() {
        if (flightNumber > 0)
            return "Flight #" + flightNumber;
        else
            return "Flight Class " + flightClass;
    }
}
