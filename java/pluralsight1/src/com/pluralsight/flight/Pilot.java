package com.pluralsight.flight;

public abstract class Pilot {
    private Flight currentFlight;
    public void fly(Flight f) {
        if (this.canAccept(f))
            this.currentFlight = f;
        else
            this.handleCantAccept();
    }
    public abstract boolean canAccept(Flight f);
    private void handleCantAccept() {
        System.out.println("Can't accept");
    }
}
