package com.fundamentals.calcengine;

public class MainIni {

    public static void main(String[] args) {
        double val1 = 100.0d;
        double val2 = 50.0d;
        double result;
        char opCode = 'a';

        if(opCode == 'a')
            result = val1 + val2;
        else if(opCode == 's')
            result = val1 - val2;
        else if(opCode == 'd')
            result = val2 != 0.0d ? val1 / val2 : 0.0d;
//	    	if(val2 != 0.0d)
//	        	result = val1 / val2;
//	    	else
//	    		result = 0.0d;
        else if(opCode == 'm')
            result = val1 * val2;
        else
            System.out.println("Error - invalid opCode");
        result = 0.0d;

        System.out.println(result);

//	    float[] arr = {1.0f, 2.0f, 3.0f};
        float[] arr = new float[3];
        arr[0] = 1.0f;
        arr[1] = 2.0f;
        arr[2] = 3.0f;
        System.out.println(arr.length);

        for(int i = 0; i < arr.length; i++)
            System.out.println(i + " " + arr[i]);
        for(float currentVal: arr)
            System.out.println(currentVal);

        int iVal = 10;
        switch(iVal % 2) {
            case 0:
                System.out.print(iVal);
                System.out.println(" is even");
                break;
            case 1:
                System.out.print(iVal);
                System.out.println(" is odd");
                break;
            default:
                System.out.println("oops it broke");
                break;
        }

    }
}
