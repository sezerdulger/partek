package com.sdulger.app;

import org.neo4j.graphdb.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.neo4j.core.GraphDatabase;

import com.partek.mail.SendMailTLS;
import com.rest.processor.rest.RestApp;
import com.sdulger.model.Role;
import com.sdulger.model.User;
import com.sdulger.repository.RoleRepository;
import com.sdulger.repository.UserRepository;

@SpringBootApplication
@RestApp(path = "C:/Users/sdulger/workspace/marsjee/svn/runtime-New_configuration/service")
@ComponentScan(basePackages={"com.sdulger", "com.partek"})
public class ServiceApplication implements CommandLineRunner {

	
	@Autowired
	ServiceApplicationConfig config;
	/*
	@Autowired
	public GraphDatabase db;
	*/
	@Autowired
	SendMailTLS mail;
	/*
	@Autowired
	public ServiceFormRepository serviceFormRepository;
	
	@Autowired
	CustomerRepository customerRepository;*/
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepository;

	public static void main(String[] args) throws Exception {
		//FileUtils.deleteRecursively(new File("partek.db"));
		
		
		
		SpringApplication.run(ServiceApplication.class, args);
	}

	public void run(String... args) throws Exception {
		for (String arg : args) {
			if (arg.contains("temppath=")) {
				config.temppath = arg.split("temppath=")[1];
			}
		}
		
		System.out.println(config.temppath);
		mail.initialize();
		/*
		Transaction tx = db.beginTx();
		try {
			User u = userRepository.findByUsername("admin");
			
			if (u == null) {
				u = new User();
				u.setUsername("admin");
				u.setPassword("RAPtor1234");

				Role r = roleRepository.findByTitle("ADMIN");
				if (r== null) {
					r = new Role();
					r.setTitle("ADMIN");
					roleRepository.save(r);
				}

				u.setRole(r);
				u.setActive(true);
				userRepository.save(u);
				
			}
			tx.success();
		}
		catch(Exception ex) {
			tx.failure();
		}
		finally {
			tx.close();
		}*/
	}
}
