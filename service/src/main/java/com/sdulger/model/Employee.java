package com.sdulger.model;

import java.io.Serializable;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;

import com.rest.processor.rest.RestField;
import com.rest.processor.rest.RestModel;
import com.sdulger.base.AbstractModel;

@NodeEntity
@RestModel(name="Employee")
public class Employee extends AbstractModel implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1334122160117707164L;
	
	@RestField(showInGet = true)
	private @GraphId Long id;
	
	@RestField(showInGet = true)
	private String name;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
