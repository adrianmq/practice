package com.pluralsight.flight;

public class FullLicensePilot extends Pilot {
    @Override
    public boolean canAccept(Flight f) {
        return true;
    }
}
