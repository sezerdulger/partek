package com.partek.security;

import java.io.IOException;
import java.util.Locale;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.core.GraphDatabase;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.servlet.LocaleResolver;

import com.partek.repository.ModelRightRepository;
import com.partek.repository.RoleRepository;
import com.partek.repository.UserRepository;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	UserRepository userRepo;

	@Autowired
	RoleRepository roleRepo;

	@Autowired
	ModelRightRepository modelRightRepo;
	
	@Autowired
	public GraphDatabase graphDatabase;
	
	@Autowired
	RestUserDetailService restUserDetailService;
	
	 @Resource
	 private LocaleResolver localeResolver;

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		/*InMemoryUserDetailsManagerConfigurer<AuthenticationManagerBuilder> inMemory = auth.inMemoryAuthentication();
		
		Transaction tx = graphDatabase.beginTx();
		Result<User> users = userRepo.findAll();
		
		for (User user : users) {
			if (user.getActive()) {
				inMemory = inMemory.withUser(user.getUsername()).password(user.getPassword()).roles(user.getRole().getTitle()).and();
			}
		}
		tx.success();
		ServiceApplicationConfig.getInstance().auth = auth;*/
		auth.userDetailsService(restUserDetailService);
		//auth.eraseCredentials(false);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		/*http.authorizeRequests()
			.anyRequest().permitAll()
		.and().csrf().disable();*/
		
		http.authorizeRequests()
			.antMatchers("/login/**").permitAll()
			.antMatchers("/mytest/**").permitAll()
			.antMatchers("/js/**").permitAll()
			.antMatchers("/css/**").permitAll()
			.antMatchers("/**").hasAnyAuthority("ADMIN", "BASIC")
			.antMatchers("/admin/**").hasAnyAuthority("ADMIN")
			.antMatchers("/serviceform/**").hasAnyAuthority("ADMIN", "BASIC")
			.antMatchers("/user/**").hasAnyAuthority("ADMIN")
			.anyRequest().authenticated()
				// .anyRequest().authenticated()
				// .anyRequest().permitAll()
			.anyRequest().denyAll()
			.and().exceptionHandling().accessDeniedPage("/403")
			.and().logout().logoutUrl("/logout")
			.and().csrf().disable().formLogin().loginPage("/login").successHandler(new AuthenticationSuccessHandler() {
				
				@Override
				public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
						Authentication authentication) throws IOException, ServletException {
					 setLocale(authentication, request, response);
					 response.sendRedirect("/");
				}
				
				protected void setLocale(Authentication authentication, HttpServletRequest request, HttpServletResponse response) {
			        if (authentication != null) {
			        	RestUserDetails rud = (RestUserDetails)authentication.getPrincipal();
			        	if (rud != null && rud.getSettings() != null) {
			        		localeResolver.setLocale(request, response, new Locale(rud.getSettings().getLanguage()));
			        	}
			        	else {
			        		localeResolver.setLocale(request, response, new Locale("en"));
			        	}
			        }
			    }
			});
	}
	/*
	@Override
	public void configure(WebSecurity web) throws Exception {
	}*/
}
