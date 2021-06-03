package com.todoapp.rest.webservices.restfulwebservices.basic.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SpringSecurityConfigurationBasicAuth extends WebSecurityConfigurerAdapter
{
	
	@Autowired
	private UserSecurityService userSecurityService;
	
	private BCryptPasswordEncoder passwordEncoder() {
		return SecurityUtil.passwordEncoder();
	}
	
	private static final String[] PUBLIC_MATCHERS = {
			"/users/createUser"
	};
	
	@Override
	protected void configure(HttpSecurity http) throws Exception 
	{
		http
			.authorizeRequests()
				.antMatchers(PUBLIC_MATCHERS).permitAll()
				.and()
			.csrf().disable()
			.authorizeRequests((requests) -> 
					requests
					.antMatchers(HttpMethod.OPTIONS,"/**").permitAll()
					.anyRequest().authenticated())		
			.httpBasic();
	}
	
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception 
	{
		auth.userDetailsService(userSecurityService).passwordEncoder(passwordEncoder());
	}

}
