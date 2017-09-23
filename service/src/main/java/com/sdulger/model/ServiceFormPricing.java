package com.sdulger.model;

import java.io.Serializable;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;

import com.rest.processor.rest.RestField;
import com.rest.processor.rest.RestModel;
import com.sdulger.base.AbstractModel;

@NodeEntity
@RestModel(name = "ServiceFormPricing")
public class ServiceFormPricing extends AbstractModel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1519585785399581217L;
	@RestField(showInGet = true, showInIndex=true)
	private @GraphId Long id;
	
	@RestField(showInGet = true, showInIndex=true)
	private String title;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
}
