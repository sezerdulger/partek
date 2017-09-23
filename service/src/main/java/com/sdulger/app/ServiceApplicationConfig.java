package com.sdulger.app;

import java.util.Locale;

import org.neo4j.graphdb.GraphDatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.data.neo4j.core.GraphDatabase;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.stereotype.Component;

@Component
public class ServiceApplicationConfig {
	public String temppath;
	
	@Autowired
	private MessageSource messageSource;
	
	public String translate(String t) {
		return messageSource.getMessage(t, null, new Locale("tr")); 
	}
}
