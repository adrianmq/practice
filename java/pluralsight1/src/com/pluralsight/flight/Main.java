package com.pluralsight.flight;

import java.util.Arrays;

public class Main {

    public static void main(String[] args) {
        Passenger janet = new Passenger(0, 1);
        Passenger jane = new Passenger(0, 2);
        Passenger john = new Passenger(0, 2);

        Flight f = new Flight(5);
//        f.addPassengers(new Passenger[]{janet, john});
        f.addPassengers(janet, john);
        f.add1Passenger(jane);
//        System.out.println("Flight seats: "+f.seats);
        System.out.println("Flight seats: " + f.getSeats());
        System.out.println(f);

        CargoFlight cf = new CargoFlight();
//        System.out.println("CF seats: "+cf.seats);
        System.out.println("CF seats: " + cf.getSeats());
        cf.add1Package(1.0f, 2.5f, 3.0f);
        cf.add1Passenger(janet);

        Flight f1 = new CargoFlight();
        f1.add1Passenger(jane);
        //        f1.add1Package() not allowed because is Flight reference type

        Flight[] squadrom = new Flight[5];
        squadrom[0] = new Flight();
        squadrom[1] = new CargoFlight();
        squadrom[2] = new CargoFlight();
        squadrom[3] = new Flight();
        squadrom[4] = new CargoFlight();

        Flight f2 = new CargoFlight();
        System.out.println("Flight type reference with CargoFlight instance seats: " + f2.getSeats());

        f2.add1Passenger();
        cf.add1Passenger();

        // Object References
        Object[] stuff = new Object[3];
        stuff[0] = new Flight();
        stuff[1] = new Passenger(0, 2);
        stuff[2] = new CargoFlight();

        Object o = new Passenger();
        o = new Flight[5]; // because Array are classes we can assign an array to a variable of type object
        o = new CargoFlight();
        // o.add1Package(1.0, 2.5, 3.0);

        if (o instanceof CargoFlight) {
            CargoFlight cf2 = (CargoFlight) o;
            cf2.add1Package(1.0f, 2.5f, 3.0f);
        }

        // Equality
        Flight f1Eq = new Flight(175);
        Flight f2Eq = new Flight(175);
//        if (f1Eq == f2Eq) // false
//            // do something
        if (f1Eq.equals(f2Eq))
            System.out.println("The objects are the same");
        else
            System.out.println("The objects aren't the same");

        // inheritance and constructor
        Flight f175 = new Flight(175);
        CargoFlight cfIni = new CargoFlight();
        CargoFlight cf294 = new CargoFlight(294);
        CargoFlight cf85 = new CargoFlight(85, 2000.0f);
        CargoFlight cfBig = new CargoFlight(5000.0f);

        System.out.println("My flight is " + f175);

        // enumeration types
        CrewMember judy = new CrewMember(FlightCrewJob.CoPilot);
        judy.setJob(FlightCrewJob.Pilot);
        judy.setName("Judy");

        // abstract relationships through interfaces
        Passenger bob = new Passenger();
        bob.setLevelAndDays(1, 180);
        Passenger jan = new Passenger();
        jan.setLevelAndDays(1, 90);
        Passenger steve = new Passenger();
        steve.setLevelAndDays(2, 180);
        Passenger lisa = new Passenger();
        lisa.setLevelAndDays(3, 730);
        Passenger[] passengers = {bob, jan, steve, lisa};
        Arrays.sort(passengers);
        for (Passenger p: passengers) {
            System.out.println(String.format("Passenger level %s and days %s", p.getMemberLevel(), p.getMemberDays()).toString());
        }

        Flight lax045 = new Flight();
        lax045.setFlightTime(45);
        Flight slc015 = new Flight();
        slc015.setFlightTime(15);
        Flight nyc030 = new Flight();
        nyc030.setFlightTime(30);

        Flight[] flights = {lax045, slc015, nyc030};
        Arrays.sort(flights);
        for (Flight ff: flights) {
            System.out.println(String.format("Flight time %s", ff.getFlightTime()));
        }

        bob.setName("Bob");
        jan.setName("Jan");
        lax045.addCrew(judy);
        lax045.addPassengers(bob, jan);
        for (Person p: lax045) {
            System.out.println(p.getName());
        }
    }
}
