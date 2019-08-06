package com.pluralsight.dataTypes;

import com.pluralsight.flight.Flight;

public class Main {

    public static void main(String[] args) {

        // String Class
        String name = "Jim";
        System.out.println("Hi " + name);
        String greeting = "Hello"; // Memory allocation for "Hello", greeting points to it
        greeting += " "; // Memory allocation for "Hello ", greeting points to new location
        greeting += "World"; // Memory allocation for "Hello World", greeting points to new location

        String s1 = "I Love";
        s1 += " Java";
        String s2 = "I";
        s2 += " Love Java";
        // reference based comparison
        // '==' checks whether the two variables reference the same object instance
        if (s1 == s2) // false
            System.out.println("The two references point to the same object instances");
        // char-by-char comparison => expensive
        if (s1.equals(s2)) {
            System.out.println("The strings are the same");
        }
        // returns a canonicalized reference of a string value
        // String.intern() => always return back the exact same string object for a string value
        // !!! ensures that two strings with the same value will reference the exact same object
        String s3 = s1.intern();
        String s4 = s2.intern();
        if (s3 == s4) // true
            System.out.println("The two references point to the same object instances");

        // converting non-string types to strings
        // String.valueOf provides overrides to handle most types
        int iVal = 100;
        String sVal = String.valueOf(iVal);
        // Conventions often happen implicintly
        int i = 2, j = 3;
        int result = i * j;
        System.out.println(i + " * " + j + " = " + result);

        StringBuilder sb = new StringBuilder(40);
        Flight f1 = new Flight(175);
        String location = "Florida";

        sb.append("I flew to ");
        sb.append(location);
        sb.append(" on ");
        sb.append(f1);

        int time = 9;
        int pos = sb.length() - " on ".length() - f1.toString().length();

        sb.insert(pos, " at ");
        sb.insert(pos + 4, time);

        String message = sb.toString();
        System.out.println("Message " + message);

        // Wrapper Class & Primitive Conversion
        Integer a = 100;
        int b = a;
        Integer c = b;
        Integer d = Integer.valueOf(100);
        int e = d.intValue();
        Integer f = Integer.valueOf(e);
        Float g = Float.valueOf(18.125f);
        float h = g.floatValue();
        String s = "87.44";
        double s10 = Double.parseDouble(s);
        // returns a reference to the wrapper class that has the value of 's'
        Double s11 = Double.valueOf(s);

        // Wrapper Class Equality
        Integer i1000A = 10 * 10 * 10;
        Integer i1000B = 100 * 10;
        if (i1000A == i1000B) // false
            System.out.println("Wrapper class instances are the same");
        if (i1000A.equals(i1000B)) // true
            System.out.println("Wrapper class instances are the same (.equals)");

        Integer i8A = 2 * 2 * 2;
        Integer i8B = 2* 4;
        if (i8A == i8B) // true
            System.out.println("Wrapper class instances are the same");

        // error handling
        int ii = 12;
        int jj = 2;
        try {
            int result2 = ii / (jj - 2);
            System.out.println(result2);
        } catch(Exception ex) {
            System.out.println("Error: " + ex.getMessage());
            ex.printStackTrace();
        }
    }
}
