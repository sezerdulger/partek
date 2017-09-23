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
@RestModel(name="Product")
public class Product extends AbstractModel implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 9014986614382392469L;

	@RestField(showInGet = true)
	private @GraphId Long id;
	
	@RestField(showInIndex = true, showInGet=true)
	private String name;
	
	@Fetch
	@RestField(showInIndex = true)
	@RelatedTo(type="modelRights", direction=Direction.INCOMING)
	@RestRelation(relationTitleField="title", type=Relation.MANYTOONE, target=Customer.class, mappedBy="products")
	private Customer customer;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
