package com.sdulger.interceptor;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.sdulger.message.ResponseMessage;
import com.sdulger.model.User;
import com.sdulger.repository.UserRepository;

@Component
@Controller
public class UserInterceptor {
	@Autowired
	public UserRepository repository;

	public ResponseMessage test;

	@Autowired
	public Neo4jTemplate template;

	public void beforeIndex(List model) {
	}

	public void beforeSave(User model) {
		if (model != null) {
		}
	}

	public void beforeGet(User model) {
	}

	public void beforeCreate(User model) {
		if (model != null) {
			model.setCreatedAt(new Date());
		}
	}

	public void afterIndex(List model) {
	}

	public void afterSave(User model) {
	}

	public void afterGet(User model) {
	}

	public void afterCreate(User model) {
	}

	public void beforeDelete(User model) {
	}

	public void afterDelete(User model) {
	}

	@RequestMapping(value = "/user/modify", method = RequestMethod.GET)
	public String index(Model model) {
		return "rest/user/partial/modify";
	}
}
