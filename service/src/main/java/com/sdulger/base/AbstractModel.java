package com.sdulger.base;

import java.util.Date;

import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.RelatedTo;

import com.rest.processor.rest.RestField;
import com.rest.processor.rest.RestRelation;
import com.rest.processor.rest.RestRelation.Relation;
import com.sdulger.model.User;

public abstract class AbstractModel {
	
	@RestField(showInGet = false, showInIndex = false)
	@RestRelation(relationTitleField="username", type=Relation.MANYTOONE, target=User.class, mappedBy="createds")
	@RelatedTo(direction=Direction.OUTGOING)
	//@Relationship(direction=Relationship.OUTGOING)
	private User createdBy;
	
	@RestField(showInGet = false, showInIndex = false)
	@RestRelation(relationTitleField="username", type=Relation.MANYTOONE, target=User.class, mappedBy="owneds")
	@RelatedTo(direction=Direction.OUTGOING)
	//@Relationship(direction=Relationship.OUTGOING)
	private User owner;
	
	@RestField(showInGet = false, showInIndex = false)
	@RestRelation(relationTitleField="username", type=Relation.MANYTOONE, target=User.class, mappedBy="updateds")
	@RelatedTo(direction=Direction.OUTGOING)
	//@Relationship(direction=Relationship.OUTGOING)
	private User updatedBy;
	
	@RestField(showInGet = false, showInIndex = false)
	private Date createdAt;
	
	@RestField(showInGet = false, showInIndex = false)
	private Date updatedAt;
	
	@RestField(showInGet = false, showInIndex = false)
	private Boolean deleted = new Boolean(false);

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public User getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public User getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(User updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}
}
