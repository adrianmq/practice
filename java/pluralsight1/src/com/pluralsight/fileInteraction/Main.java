package com.pluralsight.fileInteraction;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        BufferedReader reader = null;
        int total = 0;
        String fileName = "C:\\Users\\admatei\\practice\\java\\pluralsight1\\src\\com\\pluralsight\\fileInteraction\\Numbers.txt";

        try {
            FileReader fileReader = new FileReader(fileName.toString());
            reader = new BufferedReader(fileReader);
            String line = null;
            while ((line = reader.readLine()) != null)
                total += Integer.valueOf(line);
            System.out.println("Total: " + total);
        } catch (NumberFormatException e) {
            System.out.println("Invalid value: " + e.getMessage());
        } catch (FileNotFoundException e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
        } catch (IOException e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
        } finally {
            try {
                if (reader != null)
                    reader.close();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }
}
