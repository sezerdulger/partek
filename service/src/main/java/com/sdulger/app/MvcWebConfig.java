package com.sdulger.app;

import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;

import com.sdulger.interceptor.SettingsInterceptor;

/* Configuration for localization of Spring boot app
 * 
 * Place your resource files in src/main/resources/lang/
 * and name them 
 *   messages.properties (default fallback)
 *   messages_de.properties
 *   messages_en.properties
 *   
 * messages.properties example content:
 * welcome=Welcome
 * 
 * In Thymeleaf templates you can use this text as following:
 * <h1 th:text="#{welcome}">Welcome</h1>
 * 
 * Switching between locales like this in Thymeleaf template:
 * <p>Language : <a href="?language=en">English</a>|<a href="?language=de">German</a></p>
 * 
 */

@Configuration
@ComponentScan
public class MvcWebConfig extends WebMvcConfigurerAdapter {

	static final Logger logger = LoggerFactory.getLogger(MvcWebConfig.class);


	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(localeChangeInterceptor());
		//registry.addInterceptor(new RestInterceptor()).addPathPatterns("/*.json");
		//registry.addInterceptor(settingsInterceptor).addPathPatterns("/settings.json/**");
	}

	@Bean
	public LocaleChangeInterceptor localeChangeInterceptor() {
		LocaleChangeInterceptor localeChangeInterceptor = new LocaleChangeInterceptor();
		localeChangeInterceptor.setParamName("lang");
		return localeChangeInterceptor;
	}

	@Bean(name = "localeResolver")
	public CookieLocaleResolver localeResolver() {
		CookieLocaleResolver localeResolver = new CookieLocaleResolver();
		Locale defaultLocale = new Locale("tr");
		localeResolver.setDefaultLocale(defaultLocale);
		return localeResolver;
	}

	// as alternative with-out automatic reloading, you could use the following:
	// @Bean
	// public ResourceBundleMessageSource messageSource() {
	// ResourceBundleMessageSource messageSource = new
	// ResourceBundleMessageSource();
	// messageSource.setBasename("lang/messages");
	// return messageSource;
	// }
}
