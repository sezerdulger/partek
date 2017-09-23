package com.sdulger.model;

import java.io.Serializable;
import java.util.Date;

import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;

import com.rest.processor.rest.RestField;
import com.rest.processor.rest.RestModel;
import com.rest.processor.rest.RestRelation;
import com.rest.processor.rest.RestRelation.Relation;

@NodeEntity
@RestModel(name="User")
public class User implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -2107603788822656155L;

	@RestField(showInGet = true)
	private @GraphId Long id;
	
	@Fetch
	@RestField(showInIndex = true)
	@RestRelation(relationTitleField="title", type=Relation.MANYTOONE, target=Customer.class, mappedBy="serviceforms")
	private Role role;
	
	@RestField(showInIndex = true, showInGet = true)
	private String fullname;
	
	@RestField(showInIndex = true, showInGet = true)
	private String username;
	
	@RestField(showInGet = true, isPassword=true)
	private String password;
	
	@RestField(showInIndex = true)
	private Boolean active;
	
	@RestField(showInGet = false, showInIndex = false)
	private Date createdAt;
	
	@RestField(showInGet = false, showInIndex = false)
	private Boolean deleted;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
}
