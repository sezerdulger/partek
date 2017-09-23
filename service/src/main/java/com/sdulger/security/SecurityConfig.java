package com.sdulger.security;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Locale;
import java.util.Vector;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.neo4j.graphdb.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.neo4j.conversion.Result;
import org.springframework.data.neo4j.core.GraphDatabase;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.LocaleResolver;

import com.sdulger.app.ServiceApplicationConfig;
import com.sdulger.model.ModelRight;
import com.sdulger.repository.ModelRightRepository;

@Component
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	RestUserDetailService restUserDetailService;
	
	@Autowired
	public GraphDatabase db;
	
	 @Resource
	 private LocaleResolver localeResolver;
	 
	 @Autowired
	 ModelRightRepository repository;
	 
	 @Autowired
	 ServiceApplicationConfig config;

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
		ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry url = http.authorizeRequests();
		ExpressionUrlAuthorizationConfigurer<HttpSecurity>.AuthorizedUrl authorizedUrl = null;
		
		Transaction tx = db.beginTx();
		Page<ModelRight> models = null;
		Iterator<ModelRight> modelrightList = null;
		try {
			PageRequest pageRequest = new PageRequest(0, 500);
			models = repository.findAll(pageRequest);
			modelrightList = models.iterator();

			Vector<ModelRight> modelrightVector = new Vector<>();
			while (modelrightList.hasNext()) {
				modelrightVector.addElement(modelrightList.next());
			}

			tx.success();


			
			HashMap<String, Vector<ModelRight>> map = new HashMap<>();

			for (ModelRight modelRight : modelrightVector) {
				if (!map.containsKey(modelRight.getModel())) {
					Vector<ModelRight> ms = new Vector<>();
					ms.add(modelRight);
					map.put(modelRight.getModel(), ms);
				}
				else {
					map.get(modelRight.getModel()).add(modelRight);
				}
			}

			for (String model : map.keySet()) {
				Vector<ModelRight> rights = map.get(model);
				Vector<String> reads = new Vector<>();
				Vector<String> creates = new Vector<>();
				Vector<String> puts = new Vector<>();
				Vector<String> deletes = new Vector<>();

				reads.addElement("ADMIN");
				creates.addElement("ADMIN");
				puts.addElement("ADMIN");
				deletes.addElement("ADMIN");
				
				for (int i = 0; i < rights.size(); i++) {
					ModelRight mr = (ModelRight)rights.get(i);

					if (mr.getRead() != null && mr.getRead().booleanValue()) {
						reads.addElement(mr.getRole().getTitle());
					}

					if (mr.getCreate() != null && mr.getCreate().booleanValue()) {
						creates.addElement(mr.getRole().getTitle());
					}

					if (mr.getEdit() != null && mr.getEdit().booleanValue()) {
						puts.addElement(mr.getRole().getTitle());
					}

					if (mr.getDelete() != null && mr.getDelete().booleanValue()) {
						deletes.addElement(mr.getRole().getTitle());
					}
				}

				if (reads.size() > 0) {
					authorizedUrl = url.antMatchers(HttpMethod.GET, "/" + model + "/index/**");
					authorizedUrl.hasAnyAuthority(reads.toArray(new String[reads.size()]));

					authorizedUrl = url.antMatchers(HttpMethod.GET, "/" + model + "/select/**");
					authorizedUrl.hasAnyAuthority(reads.toArray(new String[reads.size()]));

					authorizedUrl = url.antMatchers(HttpMethod.GET, "/" + model + "/get/**");
					authorizedUrl.hasAnyAuthority(reads.toArray(new String[reads.size()]));

					authorizedUrl = url.antMatchers(HttpMethod.GET, "/" + model + ".json/**");
					authorizedUrl.hasAnyAuthority(reads.toArray(new String[reads.size()]));
				}

				if (creates.size() > 0) {
					authorizedUrl = url.antMatchers(HttpMethod.POST, "/" + model + "/**");
					authorizedUrl.hasAnyAuthority(creates.toArray(new String[creates.size()]));

					authorizedUrl = url.antMatchers(HttpMethod.GET, "/" + model + "/create/**");
					authorizedUrl.hasAnyAuthority(creates.toArray(new String[creates.size()]));

					authorizedUrl = url.antMatchers(HttpMethod.POST, "/" + model + ".json/**");
					authorizedUrl.hasAnyAuthority(creates.toArray(new String[creates.size()]));

					authorizedUrl = url.antMatchers(HttpMethod.GET, "/" + model + ".json");
					authorizedUrl.hasAnyAuthority(creates.toArray(new String[creates.size()]));
				}

				if (puts.size() > 0) {
					authorizedUrl = url.antMatchers(HttpMethod.PUT, "/" + model + ".json/**");
					authorizedUrl.hasAnyAuthority(puts.toArray(new String[puts.size()]));
				}

				if (deletes.size() > 0) {
					authorizedUrl = url.antMatchers(HttpMethod.DELETE, "/" + model + ".json/**");
					authorizedUrl.hasAnyAuthority(deletes.toArray(new String[deletes.size()]));
				}
			}


			/*
		for (ModelRight modelRight : modelRights) {
			if (modelRight.getCreate() != null && modelRight.getCreate()) {
				authorizedUrl = url.antMatchers(HttpMethod.POST, "/" + modelRight.getModel() + "/**");
				authorizedUrl.hasAnyAuthority(modelRight.getRole().getTitle());

				authorizedUrl = url.antMatchers(HttpMethod.GET, "/" + modelRight.getModel() + "/create/**");
				authorizedUrl.hasAnyAuthority(modelRight.getRole().getTitle());

				authorizedUrl = url.antMatchers(HttpMethod.POST, "/" + modelRight.getModel() + ".json/**");
				authorizedUrl.hasAnyAuthority(modelRight.getRole().getTitle());

				authorizedUrl = url.antMatchers(HttpMethod.GET, "/" + modelRight.getModel() + ".json");
				authorizedUrl.hasAnyAuthority(modelRight.getRole().getTitle());
			}
			if (modelRight.getRead() != null && modelRight.getRead()) {
				authorizedUrl = url.antMatchers(HttpMethod.GET, "/" + modelRight.getModel() + "/index/**");
				authorizedUrl.hasAnyAuthority(modelRight.getRole().getTitle());

				authorizedUrl = url.antMatchers(HttpMethod.GET, "/" + modelRight.getModel() + "/get/**");
				authorizedUrl.hasAnyAuthority(modelRight.getRole().getTitle());

				authorizedUrl = url.antMatchers(HttpMethod.GET, "/" + modelRight.getModel() + ".json/**");
				authorizedUrl.hasAnyAuthority(modelRight.getRole().getTitle());
			}
			if (modelRight.getEdit()!= null && modelRight.getEdit()) {
				authorizedUrl = url.antMatchers(HttpMethod.PUT, "/" + modelRight.getModel() + ".json/**");
				authorizedUrl.hasAnyAuthority(modelRight.getRole().getTitle());

				authorizedUrl = url.antMatchers(HttpMethod.GET, "/" + modelRight.getModel() + "/get/**");
				authorizedUrl.hasAnyAuthority(modelRight.getRole().getTitle());
			}
			if (modelRight.getDelete() != null && modelRight.getDelete()) {
				authorizedUrl = url.antMatchers(HttpMethod.DELETE, "/" + modelRight.getModel() + ".json/**");
				authorizedUrl.hasAnyAuthority(modelRight.getRole().getTitle());

				authorizedUrl = url.antMatchers(HttpMethod.GET, "/" + modelRight.getModel() + "/get/**");
				authorizedUrl.hasAnyAuthority(modelRight.getRole().getTitle());
			}
		}*/
		}
		finally {
			tx.close();
		}
		/*
		
		for (String key : map.keySet()) {
			Vector<ModelRight> rs = map.get(key);
			
			
			String[] roles = new String[rs.size()];
			
			for (int i = 0; i < rs.size(); i++) {
				ModelRight mr = rs.get(i);
				if (mr.getRole() != null) {
					roles[i] = mr.getRole().getTitle();
					authorizedUrl = url.antMatchers(key.toLowerCase());
					http = authorizedUrl.hasAnyAuthority(roles).and();
				}
				
			}
			
		}*/
		url
			.antMatchers("/repo/**").permitAll()
			.antMatchers("/login/**").permitAll()
			.antMatchers("/resources/**").permitAll()
			.antMatchers("/images/**").permitAll()
			.antMatchers("/js/**").permitAll()
			.antMatchers("/css/**").permitAll()
			.antMatchers("/").authenticated()
			.antMatchers("/test").authenticated()
			.antMatchers("/favicon.ico").authenticated()
			.antMatchers("/settings.json/**").authenticated()
			.antMatchers("/settings/**").authenticated()
			.antMatchers("/getsecureuser").authenticated()
			.antMatchers("/user/modify").authenticated()
			.antMatchers("/user.json/**").authenticated()
			//.antMatchers(HttpMethod.GET, "/user/get").hasAnyAuthority("ADMIN", "BASIC")
			//.antMatchers(HttpMethod.GET, "/user.json/**").hasAnyAuthority("ADMIN", "BASIC")
			.antMatchers("/user/**").hasAnyAuthority("ADMIN")
			//.antMatchers("/user.json/**").hasAnyAuthority("ADMIN")
			.antMatchers("/role/**").hasAnyAuthority("ADMIN")
			.antMatchers("/role.json/**").hasAnyAuthority("ADMIN")
			.antMatchers("/modelright/**").hasAnyAuthority("ADMIN")
			.antMatchers("/modelright.json/**").hasAnyAuthority("ADMIN")
			.antMatchers("/serviceform/sendmail").authenticated()
			.antMatchers("/getrights").authenticated()
			
			.anyRequest().authenticated()
			.and()
			.exceptionHandling().accessDeniedPage("/403")
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
			        	if (rud != null && rud.getSettings() != null && rud.getSettings().getLanguage() != null) {
			        		localeResolver.setLocale(request, response, new Locale(rud.getSettings().getLanguage()));
			        	}
			        	else {
			        		localeResolver.setLocale(request, response, new Locale("tr"));
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
