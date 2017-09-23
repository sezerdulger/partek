package com.sdulger.util;

import org.springframework.security.core.context.SecurityContextHolder;

import com.sdulger.model.User;
import com.sdulger.security.RestUserDetails;

public class RestServiceUtil {
	private static RestServiceUtil instance = new RestServiceUtil();
	
	private RestServiceUtil() {
		
	}
	
	public static RestServiceUtil getInstance() {
		return instance;
	}
	
	public User getCreatedBy() {
		RestUserDetails user = (RestUserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return user.getUser();
	}
}
