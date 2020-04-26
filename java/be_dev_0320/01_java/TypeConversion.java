public class TypeConversion {
    public static void main(String[] args) {
        float floatVal = 1.0f;
        double doubleVal = 4.0d;
        byte byteVal = 7;
        short shortVal = 7;
        long longVal = 5;

        short result1 = (short) byteVal;
        short result2 = (short) (byteVal - longVal);
        float result3 = longVal - floatVal;
        double result4 = longVal - doubleVal;
        // long result5 = shortVal - longVal + floatVal + doubleVal;
        double result5 = shortVal - longVal + floatVal + doubleVal;
        long result6 = (long) (shortVal - longVal + floatVal + doubleVal);

        System.out.println("ok");

        // logical operators: & | ^ !
        // and: true&true
        // or: false|true, true|false, true|true
        // exclusive or: false^true, true^false
        // negation: false
        // conditional logical operators: && || - execute from left to right (right executed only if required
    }
}