/*
 * Constructor visibility: limits what code can perform specific creations
 * Chained constructors
 * */
package com.pluralsight.flight;

public final class Passenger extends Person
        implements Comparable {
    private int checkedBags;
    //    private int freeBags;
    private final int freeBags;
    private double perBagFee;
    private int memberLevel; // 3(1st priority), 2, 1
    private int memberDays;

    public Passenger() {
        freeBags = 0;
    }

    public Passenger(int freeBags) {
        this(freeBags > 1 ? 25.0d : 50.0d);
        freeBags = freeBags;
    }

    public Passenger(int freeBags, int checkedBags) {
        this(freeBags);
        checkedBags = checkedBags;
    }
    private Passenger(double perBagFee) {
        perBagFee = perBagFee;
        freeBags = 0;
    }

    public int getCheckedBags() {
        return checkedBags;
    }

    public static class RewardProgram {
        private int memberLevel;
        private int memberDays;
        public int getMemberLevel() { return memberLevel; }
        public void setMemberLevel(int memberLevel) { this.memberLevel = memberLevel; }
        public int getMemberDays() { return memberDays; }
        public void setMemberDays(int memberDays) { this.memberDays = memberDays; }
    }

    private RewardProgram rewardProgram = new RewardProgram();

    public RewardProgram getRewardProgram() {
        return rewardProgram;
    }

    public void setLevelAndDays(int level, int days) {
        this.memberLevel = level;
        this.memberDays = days;
    }

    public int getMemberLevel() {
        return memberLevel;
    }

    public int getMemberDays() {
        return memberDays;
    }

    public int compareTo(Object o) {
        Passenger p = (Passenger) o;
        if (memberLevel > p.memberLevel)
            return -1;
        else if (memberLevel < p.memberLevel)
            return 1;
        else {
            if (memberDays > p.memberDays)
                return -1;
            else if (memberDays < p.memberDays)
                return 1;
            else
                return 0;
        }
    }
}
