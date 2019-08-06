package malaGupta;

import java.util.Arrays;
import java.util.Date;

public class Main {
    Date date1;
    java.sql.Date date2;
    static char a = 'A';

    public static void main(String[] args) {
        System.out.println("Prepare for exam " + a);
//        System.out.println(args[0]);
//        System.out.println(args[1]);

        int baseDecimal = 267;
        int octVal = 0413;
        int hexVal = 0x10B;
        int binVal = 0b100001011;
        System.out.println(baseDecimal + octVal);
        System.out.println(hexVal + binVal);

        long var1 = 0_100_267_760;
//        long var2 = 0_x_4_13;
//        long var3 = 0b_x10_BA_75;
//        long var4 = 0b_10000_10_11;
//        long var5 = 0xa10_AG_75;
//        long var6 = 01x_0000_10;
        long var7 = 100__12_12;

        float average = 20.123F;
        double inclination = 1.2011762e2;
//        float floatLiteral = 100.48_F;
//        double doubleLiteral = 100.87_d;
//        float floatLiteral2 = 100_.48F;
//        double doubleLiteral2 = 100_.87;

        boolean b1, b2, b3, b4, b5, b6;
        b1 = b2 =b3 = true;
//        b4 = 0;
//        b5 = 'false';
//        b6 = yes;

        byte age1 = 10;
        byte age2 = 20;
//        short cum = age1 + age2;

        int a = 10;
//        a = 11 + 11 + 10 - 9 + 9;
        a = ++a + a + --a - --a + a++; // 32
        System.out.println(a);

        a = 10;
//        a = 10 + 11 + 11 - 10 + 10;
        a = a++ + a + a-- - a-- + ++a; // 32
        System.out.println(a);

        a = 10;
        int b = 20;
        int c = 40;
        System.out.println(a++ > 10 || ++b <30);
        System.out.println(a > 90 && ++b < 30);
        System.out.println(!(c > 20) && a ==10);
        System.out.println(a >= 99 || a<= 33 && b == 10);
        System.out.println(a >= 99 && a <= 33 || b == 10);
        System.out.println(+a);
        System.out.println(a);

        int char1 = 97;
        int char2 = 98;
        System.out.println((char)char1 + (char)char2);
        int age = 20;
        System.out.println((float)age);
        b = 10;

        double dbl = 10;
        byte a7 = -0;
        short a4 = 0512;
        long a3 = 0X10C;
        char ch = 'a';
        long a9 = 123456789;

        boolean bool = false;
        System.out.println(++ch);
//        System.out.println(char1 >= bool);
        boolean bb = dbl >= a7 && a9 < 0 || bool == false;
        System.out.println(bb);

        float ff = 19.5f;
        System.out.println(ff = b);
    }

    private char getA() {
        return this.a;
    }
}

// Example question #1 => 111
//public class Main {
//    public static void main(String... cmd) {
//        main("private", cmd);
//    }
//    private static void main(String type, String[] args) {
//        System.out.println(args[0] + args[1]);
//    }
//}

// Example question #3 => compilation error
//public class Main {
//    public static void main(String args[]) {
//        System.out.println("Spring");
//        System.out.println(args.length);
//        System.out.println(args.getClass().isArray());
//    }
//    public static void main(String... args) {
//        System.out.println("Summer");
//        System.out.println(args.length);
//        System.out.println(args.getClass().isArray());
//    }
//    public static void main(String[] cmd) {
//        System.out.println("Autumn");
//        System.out.println(cmd.length);
//        System.out.println(cmd.getClass());
//        System.out.println(cmd.getClass().isArray());
//    }
//    public static void main() {
//        System.out.println("Winter");
//    }
//}

// Example question #4 - a,d
//public class Main {
//    static int c, a = 10, b = 21/2;
//    static {
//        c = a;
//    }
//    // a
//    public static void main(String... variables) {
//        System.out.println(b);
//    }
//    // b - runtime error
//    private static void main(String[] commandArgs) {
//        System.out.println(b);
//    }
//    // c - main method not found, please define the main method as: public static void main(String[] args)
//    public static void main(String args) {
//        System.out.println(b);
//    }
//    // d
//    private static void main() {
//        System.out.println(b);
//    }
//    public static void main(String... method) {
//        System.out.println(b);
//    }
//}

// Example question #5
// code compiles successfully if code on line 6 is commented
// code will output the same result if access modifier of main() is changed from protected to private
//public class Main {
//    protected static void main() {
//        System.out.println("EJavaGuru");
//    }
//    public static void main(String... method) {
//        System.out.println("MissionOCAJ8");
//        main();
//    }
//}

// Example question #6
// Incorrect
// Code will compile successfully only if code on line 3 is commented
// Code will compile successfully and execute without any runtime exceptions
//public class Main {
//    public static void main(String... method) {
//        main();
//        main(method);
//    }
//    protected static void main() {
//        System.out.println("EJAVAGuru");
//    }
//}

// Example question #7
// Which of the following options can be used to define a main method that outputs the value of the second and fourth command parameters (choose 2)
//public class Main {
//    // a) method.size doesn't exist
//    public static void main(String... method) {
//        for (int i = 1; i < method.size && i < 6; i = i + 2)
//            System.out.println(method[i]);
//    }
//    // b) correct
//    public static void main(String[] main) {
//        for (int i = 1; i < main.length && i < 6; i = i + 2)
//            System.out.println(main[i]);
//    }
//    // c) correct
//    public static void main(String... arguments) {
//        int ctr = 0;
//        while (ctr < arguments.length) {
//            if (ctr >= 4) break;
//            if (ctr % 2 != 0)
//                System.out.println(arguments[ctr]);
//            ++ctr;
//        }
//    }
//    // d)
//    public static void main(String[] arguments) {
//        int ctr = 1;
//        while (ctr < arguments.length) {
//            if (ctr >= 4) break;
//            if (ctr % 2 == 0)
//                System.out.println(arguments[ctr]);
//            ++ctr;
//        }
//    }
//}

// Example question #8
// Image with variation of connect4 game, where player wins if places same number in a row or column
// Which of the following assignments would enable a player with number 7 to win (choose 2 options)
//public class Main {
//    public static void main(String... args) {
//        char[][] grid = new char[][]{
//                {'7',' ',' ',' '},
//                {'5','7',' ','5'},
//                {'7','7','5','5'},
//                {'5','7','7','5'}};
//        grid[0] = new char[]{'7','7',' ',' '};
//        grid[0][1] = '7';
//        System.out.println(Arrays.deepToString(grid));
//    }
//}
