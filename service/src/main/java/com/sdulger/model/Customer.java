package com.sdulger.model;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;

import com.rest.processor.rest.RestField;
import com.rest.processor.rest.RestModel;
import com.sdulger.base.AbstractModel;

@NodeEntity
@RestModel(name="Customer")
public class Customer extends AbstractModel implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -8231007264021122235L;
	@RestField(showInGet = false)
	private @GraphId Long id;
	@RestField(showInGet = true, showInIndex=true)
	private String title;
	@RestField(showInGet = true)
	private String address;
	@RestField(showInGet = true)
	private String tel;
	
	@RestField(showInGet = true, showInIndex=true)
	private Boolean contracted = new Boolean(false); 
	
	@RestField(showInGet = true)
	private List<String> emails;
	
	@RestField(showInGet = true)
	private String authorizedPerson;
	
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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public List<String> getEmails() {
		return emails;
	}

	public void setEmails(List<String> emails) {
		this.emails = emails;
	}

	public String getAuthorizedPerson() {
		return authorizedPerson;
	}

	public void setAuthorizedPerson(String authorizedPerson) {
		this.authorizedPerson = authorizedPerson;
	}

	public Boolean getContracted() {
		return contracted;
	}

	public void setContracted(Boolean contracted) {
		this.contracted = contracted;
	}
}
