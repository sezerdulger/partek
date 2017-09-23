package com.sdulger.model;

import java.io.Serializable;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;

import com.rest.processor.rest.RestField;
import com.rest.processor.rest.RestModel;
import com.sdulger.base.AbstractModel;

@NodeEntity
@RestModel(name="Settings")
public class Settings extends AbstractModel implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -8217929887779106055L;
	
	@RestField(showInGet = true)
	private @GraphId Long id;
	
	@RestField(selection= {"en", "tr"}, showInIndex = true, multiselect=false)
	private String language;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	} 
}
