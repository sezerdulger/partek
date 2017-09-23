package com.sdulger.util;

import java.util.Locale;

public class StringUtil {
	public static String capitalize(String str) {
		return str.substring(0, 1).toUpperCase(Locale.ENGLISH) + str.substring(1);
	}
}
