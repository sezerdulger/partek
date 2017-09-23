package com.sdulger.security;

import org.neo4j.graphdb.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.core.GraphDatabase;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.sdulger.model.Settings;
import com.sdulger.model.User;
import com.sdulger.repository.ModelRightRepository;
import com.sdulger.repository.RoleRepository;
import com.sdulger.repository.SettingsRepository;
import com.sdulger.repository.UserRepository;

@Component
public class RestUserDetailService implements UserDetailsService {
	
	@Autowired
	public GraphDatabase graphDatabase;
	
	@Autowired
	UserRepository userRepo;

	@Autowired
	RoleRepository roleRepo;

	@Autowired
	ModelRightRepository modelRightRepo;
	
	@Autowired
	SettingsRepository settingsRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Transaction tx = graphDatabase.beginTx();
		User user = userRepo.findByUsername(username);
		if (user != null) {
			Settings settings = settingsRepo.findByCreatedById(user.getId());
			

			RestUserDetails userDetails = new RestUserDetails(user, settings);
			tx.success();
			tx.close();
			return userDetails;
		}
		throw new UsernameNotFoundException("Username not found");
	}
}