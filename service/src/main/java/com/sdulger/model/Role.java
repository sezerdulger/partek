package com.sdulger.model;

import java.io.Serializable;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;

import com.rest.processor.rest.RestField;
import com.rest.processor.rest.RestModel;
import com.sdulger.base.AbstractModel;

@NodeEntity
@RestModel(name="Role")
public class Role extends AbstractModel implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 4317475201458388273L;

	@RestField(showInGet = true)
	private @GraphId Long id;
	
	@RestField(showInIndex=true)
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
