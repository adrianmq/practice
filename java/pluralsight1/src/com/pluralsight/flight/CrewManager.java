package com.pluralsight.flight;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class CrewManager {
    private final static String FILENAME = "...";
    private static CrewMember[] pool;
    public static CrewMember FindAvailable(FlightCrewJob job) {
        CrewMember cm = null;
        for (int i = 0 ; i < pool.length; i++) {
            if (pool[i] != null && pool[i].getJob() == job) {
                cm = pool[i];
                pool[i] = null;
                break;
            }
        }
        return cm;
    }
    static {
        BufferedReader reader = null;
        String filename = "CrewList.txt";
        try {
            FileReader fileReader = new FileReader(filename.toString());
            reader = new BufferedReader(fileReader);
            String line = null;
            int idx = 0;
            pool = new CrewMember[10];
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                FlightCrewJob job = FlightCrewJob.valueOf(parts[0]);
                pool[idx] = new CrewMember(job);
                pool[idx].setName(parts[1]);
                idx++;
            }
        } catch (IOException e) {
            // handle error
        }
    }
}
