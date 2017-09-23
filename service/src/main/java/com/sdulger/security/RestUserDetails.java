package com.sdulger.security;

import java.util.Collection;
import java.util.HashSet;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.sdulger.model.Settings;
import com.sdulger.model.User;

public class RestUserDetails implements UserDetails {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 2882014103068871119L;
	
	String username;
	String password;
	boolean enabled;
	Collection<GrantedAuthority> authorities;
	private User user;
	private Settings settings;
	
	public RestUserDetails(User user, Settings settings) {
		this.username = user.getUsername();
		this.password = user.getPassword();
		this.enabled = user.getActive();
		this.user = user;
		this.settings = settings;
		GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().getTitle());
		authorities = new HashSet<>();
		authorities.add(authority);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return enabled;
	}

	public User getUser() {
		return user;
	}

	public Settings getSettings() {
		return settings;
	}

	public void setSettings(Settings settings) {
		this.settings = settings;
	}
}
