package com.partek.restservice;

import java.util.Iterator;
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

import com.partek.ServiceApplicationConfig;
import com.partek.model.ServiceForm;
import com.partek.repository.ServiceFormRepository;

@RestController
@Component
public class ServiceFormRestService {
	@Autowired
	public ServiceFormRepository repository;

	@RequestMapping(value = "serviceform.json/page/{page}/limit/{limit}", method = RequestMethod.GET)
	public Vector<ServiceForm> index(@PathVariable(value = "page") int page,
			@PathVariable(value = "limit") int limit) {
		Transaction tx = ServiceApplicationConfig.getInstance().graphDatabase.beginTx();
		Page<ServiceForm> models = null;
		try {
			PageRequest p = new PageRequest(page, limit);
			models = repository.findAll(p);
			tx.success();
			
		} finally {
			tx.close();
		}
		Vector<ServiceForm> serviceforms = new Vector<>();
		Iterator<ServiceForm> serviceformlist = models.iterator();
	    while(serviceformlist.hasNext()) {
	    	serviceforms.addElement(serviceformlist.next());
	    }
		return serviceforms;
	}

	@RequestMapping(value = "serviceform.json/comment/{comment}/page/{page}/limit/{limit}", method = RequestMethod.GET)
	public Vector<ServiceForm> indexLimit(@PathVariable(value = "comment") String comment, @PathVariable(value = "page") int page,
			@PathVariable(value = "limit") int limit) {
		Transaction tx = ServiceApplicationConfig.getInstance().graphDatabase.beginTx();
		try {
			PageRequest p = new PageRequest(page, limit);
			Page<ServiceForm> models = repository.findByCommentLike(comment, p);
			Vector<ServiceForm> ps = new Vector<>();
			for (ServiceForm model : models) {
				ps.addElement(model);
			}
			tx.success();
			return ps;
		} finally {
			tx.close();
		}
	}

	@RequestMapping(value = "serviceform/{id}.json", method = RequestMethod.GET)
	public ServiceForm get(@PathVariable("id") Long id) {
		Transaction tx = ServiceApplicationConfig.getInstance().graphDatabase.beginTx();
		try {
			ServiceForm model = repository.findById(id);
			tx.success();
			return model;
		} finally {
			tx.close();
		}
	}

	@RequestMapping(value = "serviceform.json", method = RequestMethod.POST)
	public ServiceForm save(@RequestBody ServiceForm model) {
		Transaction tx = ServiceApplicationConfig.getInstance().graphDatabase.beginTx();
		try {
			repository.save(model);
			tx.success();
			return model;
		} finally {
			tx.close();
		}
	}

	@RequestMapping(value = "serviceform.json", method = RequestMethod.DELETE)
	public void deleteAll() {
		Transaction tx = ServiceApplicationConfig.getInstance().graphDatabase.beginTx();
		try {
			repository.deleteAll();
			tx.success();
		} finally {
			tx.close();
		}
	}
}
