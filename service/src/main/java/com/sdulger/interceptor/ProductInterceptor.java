package com.sdulger.interceptor;

import com.sdulger.app.ServiceApplicationConfig;
import com.sdulger.message.ResponseMessage;
import com.sdulger.model.Product;
import com.sdulger.repository.ProductRepository;
import com.sdulger.util.RestServiceUtil;
import java.lang.reflect.Field;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Vector;
import org.neo4j.graphdb.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.neo4j.conversion.Result;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMethod;

@Component
public class ProductInterceptor {
  @Autowired
  public ProductRepository repository;

  public ResponseMessage test;

  @Autowired
  public Neo4jTemplate template;

  public void beforeIndex(List model) {
  }

  public void beforeSave(Product model) {
    if (model != null) {
      model.setUpdatedBy(RestServiceUtil.getInstance().getCreatedBy());
      model.setUpdatedAt(new Date());
      if (model.getId() == null || model.getId() <= 0) {
        model.setCreatedBy(RestServiceUtil.getInstance().getCreatedBy());
      }
    }
  }

  public void beforeGet(Product model) {
  }

  public void beforeCreate(Product model) {
    if (model != null) {
      model.setCreatedAt(new Date());
      model.setCreatedBy(RestServiceUtil.getInstance().getCreatedBy());
      model.setOwner(RestServiceUtil.getInstance().getCreatedBy());
      model.setUpdatedBy(RestServiceUtil.getInstance().getCreatedBy());
    }
  }

  public void afterIndex(List model) {
  }

  public void afterSave(Product model) {
  }

  public void afterGet(Product model) {
  }

  public void afterCreate(Product model) {
    if (model != null) {
      model.setCreatedAt(new Date());
      model.setCreatedBy(RestServiceUtil.getInstance().getCreatedBy());
      model.setOwner(RestServiceUtil.getInstance().getCreatedBy());
      model.setUpdatedBy(RestServiceUtil.getInstance().getCreatedBy());
    }
  }

  public void beforeDelete(Product model) {
  }

  public void afterDelete(Product model) {
  }
}
