package com.sdulger.interceptor;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.stereotype.Component;

import com.sdulger.message.ResponseMessage;
import com.sdulger.model.Customer;
import com.sdulger.repository.CustomerRepository;
import com.sdulger.util.RestServiceUtil;

@Component
public class CustomerInterceptor {
	@Autowired
	public CustomerRepository repository;

	public ResponseMessage test;

	@Autowired
	public Neo4jTemplate template;

	public void beforeIndex(List model) {
	}

	public void beforeSave(Customer model) {
		if (model != null) {
			model.setUpdatedBy(RestServiceUtil.getInstance().getCreatedBy());
			model.setUpdatedAt(new Date());
			if (model.getId() == null || model.getId() <= 0) {
				model.setCreatedBy(RestServiceUtil.getInstance().getCreatedBy());
			}
		}
	}

	public void beforeGet(Customer model) {
	}

	public void beforeCreate(Customer model) {
		if (model != null) {
			model.setCreatedAt(new Date());
			model.setCreatedBy(RestServiceUtil.getInstance().getCreatedBy());
			model.setOwner(RestServiceUtil.getInstance().getCreatedBy());
			model.setUpdatedBy(RestServiceUtil.getInstance().getCreatedBy());
		}
	}

	public void afterIndex(List model) {
	}

	public void afterSave(Customer model) {
	}

	public void afterGet(Customer model) {
	}

	public void afterCreate(Customer model) {
		model.setCreatedAt(new Date());
		model.setCreatedBy(RestServiceUtil.getInstance().getCreatedBy());
		model.setOwner(RestServiceUtil.getInstance().getCreatedBy());
		model.setUpdatedBy(RestServiceUtil.getInstance().getCreatedBy());
	}

	public void beforeDelete(Customer model) {
	}

	public void afterDelete(Customer model) {
	}
}
