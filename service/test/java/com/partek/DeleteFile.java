package com.partek;

import java.io.File;

public class DeleteFile {

	public static void main(String[] args) {
		File newFile = new File("c:\\partek.txt");
		newFile.delete();
	}

}
