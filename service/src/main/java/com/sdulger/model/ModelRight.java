package com.sdulger.model;

import java.io.Serializable;

import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedTo;

import com.rest.processor.rest.RestField;
import com.rest.processor.rest.RestModel;
import com.rest.processor.rest.RestRelation;
import com.rest.processor.rest.RestRelation.Relation;
import com.sdulger.base.AbstractModel;

@NodeEntity
@RestModel(name="ModelRight")
public class ModelRight extends AbstractModel implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 9122478445829638578L;

	@RestField(showInGet = true)
	private @GraphId Long id;
	
	@Fetch
	@RestField(showInGet = true, showInIndex = true)
	@RelatedTo(type="modelRights", direction=Direction.INCOMING)
	//@Relationship(type="modelRights",direction=Relationship.INCOMING)
	@RestRelation(relationTitleField="title", type=Relation.ONETOONE, target=Role.class, mappedBy="modelright")
	private Role role;
	
	@RestField(showInGet = true,selection= {"serviceform", "customer", "user"}, showInIndex = true, multiselect=false)
	private String model;
	
	@RestField(showInGet = true)
	private Boolean read = new Boolean(false);
	
	@RestField(showInGet = true)
	private Boolean create = new Boolean(false);
	
	@RestField(showInGet = true)
	private Boolean edit = new Boolean(false);
	
	@RestField(showInGet = true)
	private Boolean delete = new Boolean(false);

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public Boolean getRead() {
		return read;
	}

	public void setRead(Boolean read) {
		this.read = read;
	}

	public Boolean getCreate() {
		return create;
	}

	public void setCreate(Boolean create) {
		this.create = create;
	}

	public Boolean getEdit() {
		return edit;
	}

	public void setEdit(Boolean edit) {
		this.edit = edit;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Boolean getDelete() {
		return delete;
	}

	public void setDelete(Boolean delete) {
		this.delete = delete;
	}
}
