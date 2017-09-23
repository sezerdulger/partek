package com.sdulger.interceptor;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.stereotype.Component;

import com.sdulger.message.ResponseMessage;
import com.sdulger.model.Settings;
import com.sdulger.repository.SettingsRepository;
import com.sdulger.util.RestServiceUtil;

@Component
public class SettingsInterceptor {
  @Autowired
  public SettingsRepository repository;

  public ResponseMessage test;

  @Autowired
  public Neo4jTemplate template;

  public void beforeIndex(List model) {
  }

  public void beforeSave(Settings model) {
    if (model != null) {
      model.setUpdatedBy(RestServiceUtil.getInstance().getCreatedBy());
      model.setUpdatedAt(new Date());
      if (model.getId() == null || model.getId() <= 0) {
    	  model.setCreatedBy(RestServiceUtil.getInstance().getCreatedBy());
      }
    }
  }

  public void beforeGet(Settings model) {
  }

  public void beforeCreate(Settings model) {
    if (model != null) {
      model.setCreatedAt(new Date());
      model.setCreatedBy(RestServiceUtil.getInstance().getCreatedBy());
      model.setOwner(RestServiceUtil.getInstance().getCreatedBy());
      model.setUpdatedBy(RestServiceUtil.getInstance().getCreatedBy());
    }
  }

  public void afterIndex(List model) {
  }

  public void afterSave(Settings model) {
  }

  public void afterGet(Settings model) {
  }

  public void afterCreate(Settings model) {
  }

  public void beforeDelete(Settings model) {
  }

  public void afterDelete(Settings model) {
  }
}
