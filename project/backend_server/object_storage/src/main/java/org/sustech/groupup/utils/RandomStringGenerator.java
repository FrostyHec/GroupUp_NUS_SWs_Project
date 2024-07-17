package org.sustech.groupup.utils;

import java.util.Random;

public class RandomStringGenerator {
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int LENGTH = 64;
    private final Random random = new Random();

    private int len;
    public RandomStringGenerator(int len){
        this.len = len;
    }
    public String nextString() {
        StringBuilder sb = new StringBuilder(len);

        for (int i = 0; i < len; i++) {
            int index = random.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(index));
        }

        return sb.toString();
    }
}