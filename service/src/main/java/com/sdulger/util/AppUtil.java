package com.sdulger.util;

import java.io.File;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class AppUtil {
	private static AppUtil instance = null;
	Properties projectProperties = null;
	public AuthenticationManagerBuilder auth;
	
	private AppUtil() {
	}
	
	public static AppUtil getInstance() {
		if (instance == null) {
			instance = new AppUtil();
		}
		return instance;
	}
	public static boolean viewExists(String path) {
		try {
	    	 ServletRequestAttributes sra = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
	    	 String dir ;
	    	 if (sra != null) {
	    	    HttpServletRequest req = sra.getRequest();
	    	    dir = req.getRealPath("WEB-INF/views/"+ path);
	    	 }
	    	 else {
	    		dir= "/home/pudge/workspace/luna/OMF/v7_0_juidialog/OMF/src/main/webapp/WEB-INF/vies/" + path;
	    	 }
			File f = new File(dir);
			return f.exists();
	     } catch (Exception e) {
	 		// TODO Auto-generated catch block
	 		e.printStackTrace();
	 	}
		return false;
	}
	
	public String getProjectProperty(String key) {
		return projectProperties.getProperty(key);
	}
	
	public static String getFormNameFromReqUri(HttpServletRequest request) {
		 String form = request.getRequestURI().split("/")[3];
		 return form;
	}
	
	public static String getActionNameFromReqUri(HttpServletRequest request) {
		 String action = request.getRequestURI().split("/")[4];
		 return action;
	}
}
