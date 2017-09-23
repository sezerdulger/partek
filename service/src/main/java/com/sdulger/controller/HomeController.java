package com.sdulger.controller;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.servlet.LocaleResolver;

import com.sdulger.app.ServiceApplicationConfig;
import com.sdulger.message.ResponseMessage;
import com.sdulger.security.RestUserDetails;

@Controller
@RequestMapping("/")
public class HomeController {
	
	@Autowired
	ServiceApplicationConfig config;
	
	@RequestMapping("/")
	public String home(Model model) {
		return "main/sidenav";
	}
	
	@RequestMapping("/test")
	public String sidenav(Model model) {
		return "angular";
	}
	
	@RequestMapping("/about")
	public String about(Model model) {
		
		return "main/about";
	}
	
	@RequestMapping(value="/getsecureuser")
	public @ResponseBody RestUserDetails getsecureUser() {
		RestUserDetails user = (RestUserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return user;
	}
	
	@RequestMapping("/login")
	public String login(Model model) {
		return "main/login";
	}
	
	@RequestMapping("/convert/{value}")
	public String convert(HttpServletRequest request, @PathVariable("value") int value) {
		WebApplicationContext wac = WebApplicationContextUtils.getRequiredWebApplicationContext(request.getServletContext());
        Map resolvers = wac.getBeansOfType(LocaleResolver.class);
        if (resolvers.size()==1) {
        	Collection c= (Collection) resolvers.values();
        }
        return "";
	}
	
	@RequestMapping("/403")
	public String forbidden(Model model) {
		System.out.println("forbidden");
		return "main/403";
	}
	/*
	@RequestMapping(value="/login", method = RequestMethod.POST)
	public ResponseMessage postlogin(Model model, @RequestBody Credentials credentials) {
		User user = userRepo.findByUsername(credentials.username);
		ResponseMessage rm = new ResponseMessage();
		if (user.getPassword().equals(credentials.getPassword())) {
			rm.success = true;
		}
		else {
			rm.success = false;
		}
		return rm;
	}*/
	
	@RequestMapping("/angular20")
	public String angular20(Model model) {
		return "angular20";
	}
	
	@RequestMapping("/mobile")
	public String mobile(Model model) {
		return "mobile";
	}
	
	@RequestMapping("/admin")
	public String admin(Model model) {
		return "admin";
	}
	@RequestMapping("/isloggedin")
	public ResponseMessage isLoggedIn() {
		ResponseMessage rm = new ResponseMessage();
		if(SecurityContextHolder.getContext().getAuthentication() != null &&
				 SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {
			rm.data = Collections.singletonMap("username", SecurityContextHolder.getContext().getAuthentication().getName());
			rm.success = true;
		}
		rm.success = false;
		return rm;
	}
	
	@RequestMapping("/initializedata")
	public String initializeData(Model model) throws Exception {
		return "partek";
	}
	@RequestMapping("/translate/{item}")
	public @ResponseBody ResponseMessage translate(@PathVariable("item") String item) throws Exception {
		ResponseMessage rm = new ResponseMessage();
		try {
			rm.data = config.translate(item);
		}
		catch(Exception ex) {
			rm.data = config.translate("str." + item);
		}
		return rm;
	}
	
	
	@RequestMapping("/mytest")
	public void mytest(Model model) throws Exception {/*
		Vector<Settings> sets = settingService.findAll().restList;
		for (Settings s : sets) {
			s.setOwner(null);
			s.setCreatedBy(null);
			settingService.save(s);
		}*/
	}
}
