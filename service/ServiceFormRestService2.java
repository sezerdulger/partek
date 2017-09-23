package com.partek.restservice;

import com.partek.ServiceApplicationConfig;
import com.partek.model.ServiceForm;
import com.partek.repository.ServiceFormRepository;
import java.lang.Long;
import java.util.Vector;
import org.neo4j.graphdb.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Component
public class ServiceFormRestService2 {
  @Autowired
  public ServiceFormRepository repository;

  @RequestMapping(
      value = "serviceform.json",
      method = RequestMethod.GET
  )
  public Vector<ServiceForm> index() {
    Transaction tx = ServiceApplicationConfig.getInstance().graphDatabase.beginTx();
    try {
      Iterable<ServiceForm> models = repository.findAll();
      Vector<ServiceForm> ps = new Vector<>();
      for (ServiceForm model : models) {
        ps.addElement(model);
      }
      tx.success();
      return ps;
    }
    finally {
      tx.close();
    }
  }
  @RequestMapping(
	      value = "serviceform.json/comment/{comment}/limit/{limit}",
	      method = RequestMethod.GET
	  )
  public Vector<ServiceForm> indexLimit(@PathVariable(value="comment") String comment, @PathVariable(value="limit") int limit) {
	    Transaction tx = ServiceApplicationConfig.getInstance().graphDatabase.beginTx();
	    try {
	    	PageRequest p = new PageRequest(1, limit);
	      Page<ServiceForm> models = repository.findByCommentLike(comment, limit, p);
	      Vector<ServiceForm> ps = new Vector<>();
	      for (ServiceForm model : models) {
	        ps.addElement(model);
	      }
	      tx.success();
	      return ps;
	    }
	    finally {
	      tx.close();
	    }
	  }

  @RequestMapping(
      value = "serviceform/{id}.json",
      method = RequestMethod.GET
  )
  public ServiceForm get(@PathVariable("id") Long id) {
    Transaction tx = ServiceApplicationConfig.getInstance().graphDatabase.beginTx();
    try {
      ServiceForm model = repository.findById(id);
      tx.success();
      return model;
    }
    finally {
      tx.close();
    }
  }

  @RequestMapping(
      value = "serviceform.json",
      method = RequestMethod.POST
  )
  public ServiceForm save(@RequestBody ServiceForm model) {
    Transaction tx = ServiceApplicationConfig.getInstance().graphDatabase.beginTx();
    try {
      repository.save(model);
      tx.success();
      return model;
    }
    finally {
      tx.close();
    }
  }

  @RequestMapping(
      value = "serviceform.json",
      method = RequestMethod.DELETE
  )
  public void deleteAll() {
    Transaction tx = ServiceApplicationConfig.getInstance().graphDatabase.beginTx();
    try {
      repository.deleteAll();
      tx.success();
    }
    finally {
      tx.close();
    }
  }
}
