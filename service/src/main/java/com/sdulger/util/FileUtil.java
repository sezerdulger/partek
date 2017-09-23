package com.sdulger.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

import com.rest.processor.RestFile;

public class FileUtil {
	
	public static void writeFile(String path, String body) {
		
		try {
			/**
			 * TODO Change necessary lines
			 */
			File newFile = new File(path);
			if (newFile.exists()) {
				newFile.delete();
			}
			newFile.getParentFile().mkdirs();
			newFile.createNewFile();
			newFile.setWritable(true);
			
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(newFile), "UTF-8"));
			bw.append(body);
			/*
			 * for (String str :
			 * newJspBodies[i].split("\n")) {
			 * bw.write(str + "\n"); }
			 */
			bw.flush();
			bw.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
	public static void writeFileIfNotExists(String path, String body) {
		
		try {
			/**
			 * TODO Change necessary lines
			 */
			File newFile = new File(path);
			if (newFile.exists()) {
				return;
			}
			newFile.getParentFile().mkdirs();
			newFile.createNewFile();
			newFile.setWritable(true);
			
			BufferedWriter bw = new BufferedWriter(new FileWriter(newFile, true));
			bw.append(body);
			/*
			 * for (String str :
			 * newJspBodies[i].split("\n")) {
			 * bw.write(str + "\n"); }
			 */
			bw.flush();
			bw.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	public static void writeFile(File newFile, String body) throws Exception {
		BufferedWriter bw = new BufferedWriter(new FileWriter(newFile, true));
		bw.append(body);
		/*
		 * for (String str :
		 * newJspBodies[i].split("\n")) {
		 * bw.write(str + "\n"); }
		 */
		bw.flush();
		bw.close();
	}
	
	public static void writeLog(String body) {
		try {
			File newFile = new File("c:\\partek.txt");
			
			BufferedWriter bw = new BufferedWriter(new FileWriter(newFile, true));
			bw.append(body);
			/*
			 * for (String str :
			 * newJspBodies[i].split("\n")) {
			 * bw.write(str + "\n"); }
			 */
			bw.flush();
			bw.close();
		} catch (Exception e) {
			// TODO: handle exception
		}
	}
	
	public static String readFile(String path) {
		try {
			File f = new File(path);
			FileInputStream fis = new FileInputStream(f);
			BufferedReader br = new BufferedReader(new InputStreamReader(fis));

			String line = "";
			StringBuilder templateBody = new StringBuilder();
			while (line != null) {
				templateBody.append(line + "\n");
				line = br.readLine();
			}
			br.close();
			return templateBody.toString();
		} catch (Exception e) {
		}
		return "";
		
	}
}
