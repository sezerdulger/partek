package com.sdulger.interceptor;

import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;

import org.neo4j.graphdb.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.neo4j.conversion.Result;
import org.springframework.data.neo4j.core.GraphDatabase;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sdulger.app.ServiceApplicationConfig;
import com.sdulger.message.ResponseMessage;
import com.sdulger.model.ModelRight;
import com.sdulger.repository.ModelRightRepository;
import com.sdulger.util.RestServiceUtil;

@Component
@Controller
public class ModelRightInterceptor {
	@Autowired
	public ModelRightRepository repository;

	@Autowired
	public GraphDatabase db;
	
	public ResponseMessage test;

	@Autowired
	public Neo4jTemplate template;

	@Autowired
	ServiceApplicationConfig config;

	public void beforeIndex(List model) {
	}

	public void beforeSave(ModelRight model) {
		if (model != null) {
			model.setUpdatedBy(RestServiceUtil.getInstance().getCreatedBy());
			model.setUpdatedAt(new Date());
			if (model.getId() == null || model.getId() <= 0) {
				model.setCreatedBy(RestServiceUtil.getInstance().getCreatedBy());
			}
		}
	}

	public void beforeGet(ModelRight model) {
	}

	public void beforeCreate(ModelRight model) {
		if (model != null) {
			model.setCreatedAt(new Date());
			model.setCreatedBy(RestServiceUtil.getInstance().getCreatedBy());
			model.setOwner(RestServiceUtil.getInstance().getCreatedBy());
			model.setUpdatedBy(RestServiceUtil.getInstance().getCreatedBy());
		}
	}

	public void afterIndex(List model) {
	}

	public void afterSave(ModelRight model) {
	}

	public void afterGet(ModelRight model) {
	}

	public void afterCreate(ModelRight model) {
		model.setCreatedAt(new Date());
		model.setCreatedBy(RestServiceUtil.getInstance().getCreatedBy());
		model.setOwner(RestServiceUtil.getInstance().getCreatedBy());
		model.setUpdatedBy(RestServiceUtil.getInstance().getCreatedBy());
	}

	public void beforeDelete(ModelRight model) {
	}

	public void afterDelete(ModelRight model) {
	}

	@RequestMapping(value = "/getrights", method = RequestMethod.GET)
	public @ResponseBody HashMap<String, Vector<String>> getModelRights() {
		Transaction tx = db.beginTx();
		Page<ModelRight> models = null;
		Iterator<ModelRight> modelrightList = null;
		try {
			PageRequest pageRequest = new PageRequest(0, 500);
			models = repository.findAll(pageRequest);
			modelrightList = models.iterator();
			
			Vector<ModelRight> modelrightVector = new Vector<>();
			while (modelrightList.hasNext()) {
				modelrightVector.addElement(modelrightList.next());
			}

			tx.success();

			HashMap<String, Vector<ModelRight>> map = new HashMap<>();

			HashMap<String, Vector<String>> modelReads = new HashMap<>();

			for (ModelRight modelRight : modelrightVector) {
				if (modelRight.getModel() != null) {
					if (!map.containsKey(modelRight.getModel())) {
						Vector<ModelRight> ms = new Vector<>();
						ms.add(modelRight);
						map.put(modelRight.getModel(), ms);
					}
					else {
						map.get(modelRight.getModel()).add(modelRight);
					}
				}
			}
			map.put("user", new Vector<>());
			map.put("modelright", new Vector<>());
			map.put("role", new Vector<>());

			for (String model : map.keySet()) {
				Vector<ModelRight> rights = map.get(model);
				Vector<String> reads = new Vector<>();
				Vector<String> creates = new Vector<>();
				Vector<String> puts = new Vector<>();
				Vector<String> deletes = new Vector<>();
				reads.addElement("ADMIN");

				for (int i = 0; i < rights.size(); i++) {
					ModelRight mr = (ModelRight)rights.get(i);

					if (mr.getRead() != null && mr.getRead().booleanValue()) {
						reads.addElement(mr.getRole().getTitle());
					}

					if (mr.getCreate() != null && mr.getCreate().booleanValue()) {
						creates.addElement(mr.getRole().getTitle());
					}

					if (mr.getEdit() != null && mr.getEdit().booleanValue()) {
						puts.addElement(mr.getRole().getTitle());
					}

					if (mr.getDelete() != null && mr.getDelete().booleanValue()) {
						deletes.addElement(mr.getRole().getTitle());
					}
				}

				if (reads.size() > 0) {
					modelReads.put(model, reads);
				}
				/*
			if (creates.size() > 0) {
				authorizedUrl = url.antMatchers(HttpMethod.POST, "/" + model + "/**");
				authorizedUrl.hasAnyAuthority(creates.toArray(new String[creates.size()]));

				authorizedUrl = url.antMatchers(HttpMethod.GET, "/" + model + "/create/**");
				authorizedUrl.hasAnyAuthority(creates.toArray(new String[creates.size()]));

				authorizedUrl = url.antMatchers(HttpMethod.POST, "/" + model + ".json/**");
				authorizedUrl.hasAnyAuthority(creates.toArray(new String[creates.size()]));

				authorizedUrl = url.antMatchers(HttpMethod.GET, "/" + model + ".json");
				authorizedUrl.hasAnyAuthority(creates.toArray(new String[creates.size()]));
			}

			if (puts.size() > 0) {
				authorizedUrl = url.antMatchers(HttpMethod.PUT, "/" + model + ".json/**");
				authorizedUrl.hasAnyAuthority(puts.toArray(new String[puts.size()]));
			}

			if (deletes.size() > 0) {
				authorizedUrl = url.antMatchers(HttpMethod.DELETE, "/" + model + ".json/**");
				authorizedUrl.hasAnyAuthority(deletes.toArray(new String[deletes.size()]));
			}*/
			}
			return modelReads;
		}
		finally {
			tx.close();
		}
	}
}
