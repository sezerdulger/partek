package com.sdulger.restservice;

import com.rest.processor.rest.RestRelation;
import com.sdulger.app.ServiceApplicationConfig;
import com.sdulger.interceptor.ProductInterceptor;
import com.sdulger.message.ResponseMessage;
import com.sdulger.model.Product;
import com.sdulger.repository.ProductRepository;
import com.sdulger.util.RestServiceUtil;
import java.lang.Long;
import java.lang.String;
import java.lang.reflect.Field;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;
import java.util.Vector;
import org.neo4j.graphdb.Direction;
import org.neo4j.graphdb.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.neo4j.annotation.RelatedTo;
import org.springframework.data.neo4j.conversion.Result;
import org.springframework.data.neo4j.core.GraphDatabase;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Component
public class ProductRestService {
  @Autowired
  public ProductRepository repository;

  @Autowired
  public ServiceApplicationConfig config;

  @Autowired
	public GraphDatabase db;
  
  @Autowired
  public Neo4jTemplate template;

  @Autowired
  public ProductInterceptor interceptor;

  @RequestMapping(
      value = "product.json/page/{page}/limit/{limit}/query/{query}",
      method = RequestMethod.GET
  )
  public ResponseMessage index(@PathVariable("page") int page, @PathVariable("limit") int limit, @PathVariable("query") String query) {
    ResponseMessage rm = new ResponseMessage();
    Transaction tx =db.beginTx();
    Page<Product> models = null;
    Iterator<Product> productList = null;
    Long count = null;
    try {
      PageRequest pageRequest = new PageRequest(page, limit);
      if (query != null && "none".equals(query)) {
        models = repository.findAll(pageRequest);
        productList = models.iterator();
        count = repository.count();
      }
      else {
        String[] queries = query.split(",");
        Map<String, Object> map = new HashMap<>();
        StringBuilder executeWhere = new StringBuilder();
         StringBuilder executeMatch = new StringBuilder();
        int i = 1;
        for (String q : queries) {
          String[] qs = q.split("=");
          String field = qs[0];
          String value = qs[1];
          map.put(field, value);
          Field f = Product.class.getDeclaredField(field);
          if (f.getAnnotation(RelatedTo.class) != null) {
            RelatedTo related = f.getAnnotation(RelatedTo.class);
            executeMatch.append("n");
            RestRelation restRel = f.getAnnotation(RestRelation.class);
            if (related.direction() == Direction.INCOMING) {
              executeMatch.append("<-[:" + related.type() + "]-");
              executeMatch.append("(m:" + related.elementClass().getSimpleName() + ")");
              executeWhere.append("m."+restRel.relationTitleField()+"=~'(?i).*" + value + ".*'");
            }
            else if (related.direction() == Direction.OUTGOING) {
              executeMatch.append("-[:" + related.type() + "]->");
              executeMatch.append("(m:" + related.elementClass().getSimpleName() + ")");
              executeWhere.append("m."+restRel.relationTitleField()+"=~'(?i).*" + value + ".*'");
            }
          }
          else if(f.getType().equals(String.class)) {
            executeWhere.append("n." + field);
            executeWhere.append("=");
            value = "~ '(?i).*" + value + ".*'";
            executeWhere.append(value);
          }
          else if (f.getType().equals(Date.class)) {
            executeWhere.append("n." + field);
            DateFormat format = new SimpleDateFormat("yyyy.MM.dd", Locale.ENGLISH);
            String[] dates = value.split("-");
            Date minDate = format.parse(dates[0]);
            executeWhere.append(">=");
            executeWhere.append("'" + minDate.getTime() + "'");
            if (dates.length > 1 && !dates[1].trim().isEmpty()) {
              Date maxDate = format.parse(dates[1]);
              executeWhere.append(" AND n." + field);
              executeWhere.append("<=");
              executeWhere.append("'" + maxDate.getTime() + "'");
            }
          }
          else if (f.getType().equals(Boolean.class)) {
            if(value.equals("false")) {
              executeWhere.append("(n." + field);
              executeWhere.append("=");
              executeWhere.append(value);
              executeWhere.append(" OR n." + field);
              executeWhere.append(" IS NULL)");
            }
            else {
              executeWhere.append("n." + field);
              executeWhere.append("=");
              executeWhere.append(value);
            }
          }
          if (i < queries.length) {
            executeWhere.append(" AND ");
          }
          i++;
        }
        int skip = page * limit;
        map.put("skip", skip);
        map.put("limit", limit);
        executeWhere.append(" AND ");
        executeWhere.append("((n.deleted IS NULL) OR (n.deleted=false))");
        String execute="";
        if(executeMatch.toString().equals("")) {
          execute = "MATCH (n:Product) WHERE(" + executeWhere.toString() + ") RETURN n  SKIP {skip} LIMIT {limit}";
        }
        else {
          execute = "MATCH (n:Product)," + executeMatch.toString() + " WHERE(" + executeWhere.toString() + ") RETURN n  SKIP {skip} LIMIT {limit}";
        }
        System.out.println(execute);
        Result<Product> productResult = repository.query(execute, map);
        productList = productResult.iterator();
        if(executeMatch.toString().equals("")) {
          execute = "MATCH (n:Product) WHERE (" + executeWhere.toString() + ") RETURN count(*)";
        }
        else {
          execute = "MATCH (n:Product)," + executeMatch.toString() + " WHERE (" + executeWhere.toString() + ") RETURN count(*)";
        }
        System.out.println(execute);
        count = template.query(execute, map).to(Long.class).single();
      }
      Vector<Product> productVector = new Vector<>();
      while (productList.hasNext()) {
        productVector.addElement(productList.next());
      }
      tx.success();
      rm.restList = productVector;
      rm.count = count;
    }
    catch(Exception ex) {
      ex.printStackTrace();
    }
    finally {
      tx.close();
    }
    return rm;
  }

  @RequestMapping(
      value = "product.json/{id}",
      method = RequestMethod.GET
  )
  public Product get(@PathVariable("id") Long id) {
    Product model = null;
    Transaction tx =db.beginTx();
    try {
      interceptor.beforeGet(model);
      model = repository.findById(id);
      tx.success();
      interceptor.afterGet(model);
    }
    finally {
      tx.close();
    }
    if(model != null && (model.getDeleted() == null || !model.getDeleted().booleanValue())) {
      return model;
    }
    else {
      return null;
    }
  }

  @RequestMapping(
      value = "product.json",
      method = RequestMethod.GET
  )
  public Product create() {
    Product model = null;
    Transaction tx =db.beginTx();
    try {
      interceptor.beforeCreate(model);
      model = new Product();
      tx.success();
      interceptor.afterCreate(model);
    }
    finally {
      tx.close();
    }
    return model;
  }

  @RequestMapping(
      value = "product.json",
      method = RequestMethod.POST
  )
  public Product save(@RequestBody Product model) {
    Transaction tx =db.beginTx();
    try {
      interceptor.beforeSave(model);
      repository.save(model);
      tx.success();
      interceptor.afterSave(model);
    }
    finally {
      tx.close();
    }
    return model;
  }

  @RequestMapping(
      value = "product.json/deleteall",
      method = RequestMethod.DELETE
  )
  public void deleteAll() {
    Transaction tx =db.beginTx();
    try {
      repository.deleteAll();
      tx.success();
    }
    finally {
      tx.close();
    }
  }

  @RequestMapping(
      value = "product.json/count",
      method = RequestMethod.GET
  )
  public long count() {
    Transaction tx =db.beginTx();
    long count = 0;
    try {
      count = repository.count();
      tx.success();
    }
    finally {
      tx.close();
    }
    return count;
  }

  public ResponseMessage findAll() {
    Transaction tx =db.beginTx();
    Result<Product> s;
    ResponseMessage rm = new ResponseMessage();
    try {
      s = repository.findAll();
      Vector<Product> vector = new Vector<>();
      Iterator<Product> ss = s.iterator();
      while(ss.hasNext()) {
        vector.addElement(ss.next());;
      }
      tx.success();
      rm.restList = vector;
    }
    finally {
      tx.close();
    }
    return rm;
  }

  @RequestMapping(
      value = "product.json",
      method = RequestMethod.DELETE
  )
  public ResponseMessage delete(@RequestBody Product model) {
    Transaction tx =db.beginTx();
    ResponseMessage rm = new ResponseMessage();
    try {
      repository.delete(model);
      tx.success();
      rm.success=true;
    }
    finally {
      tx.close();
    }
    return rm;
  }

  @RequestMapping(
      value = "product.json/{id}",
      method = RequestMethod.DELETE
  )
  public ResponseMessage delete(@PathVariable("id") Long id) {
    Transaction tx =db.beginTx();
    ResponseMessage rm = new ResponseMessage();
    Product model = null;
    try {
      model = repository.findById(id);
      interceptor.beforeDelete(model);
      model.setDeleted(true);
      repository.save(model);
      tx.success();
      interceptor.afterDelete(model);
      rm.success=true;
    }
    finally {
      tx.close();
    }
    return rm;
  }
}
