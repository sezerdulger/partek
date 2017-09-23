package com.sdulger.interceptor;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.stereotype.Component;

import com.sdulger.message.ResponseMessage;
import com.sdulger.model.Role;
import com.sdulger.repository.RoleRepository;
import com.sdulger.util.RestServiceUtil;

@Component
public class RoleInterceptor {
  @Autowired
  public RoleRepository repository;

  public ResponseMessage test;

  @Autowired
  public Neo4jTemplate template;

  public void beforeIndex(List model) {
  }

  public void beforeSave(Role model) {
    if (model != null) {
      model.setUpdatedBy(RestServiceUtil.getInstance().getCreatedBy());
      model.setUpdatedAt(new Date());
      if (model.getId() == null || model.getId() <= 0) {
    	  model.setCreatedBy(RestServiceUtil.getInstance().getCreatedBy());
      }
    }
  }

  public void beforeGet(Role model) {
  }

  public void beforeCreate(Role model) {
    if (model != null) {
      model.setCreatedAt(new Date());
      model.setCreatedBy(RestServiceUtil.getInstance().getCreatedBy());
      model.setOwner(RestServiceUtil.getInstance().getCreatedBy());
      model.setUpdatedBy(RestServiceUtil.getInstance().getCreatedBy());
    }
  }

  public void afterIndex(List model) {
  }

  public void afterSave(Role model) {
  }

  public void afterGet(Role model) {
  }

  public void afterCreate(Role model) {
  }

  public void beforeDelete(Role model) {
  }

  public void afterDelete(Role model) {
  }
}
