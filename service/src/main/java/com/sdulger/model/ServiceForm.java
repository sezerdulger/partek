package com.sdulger.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

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
@RestModel(name = "ServiceForm", indexQueryAdditions = "ORDER BY n.requestDate DESC")
public class ServiceForm extends AbstractModel implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1566055244399667239L;

	@RestField(showInGet = true)
	private @GraphId Long id;
	
	@Fetch
	@RestField(showInIndex = true)
	@RelatedTo(type="serviceForms", direction=Direction.OUTGOING, elementClass=Customer.class)
	@RestRelation(relationTitleField="title", type=Relation.MANYTOONE, target=Customer.class, mappedBy="serviceforms")
	private Customer customer;
	
	@RestField(showInGet = true)
	private String customerTitle;
	
	@RestField(showInGet = true)
	private String department;
	
	@RestField(showInGet = true)
	private String address;
	
	@RestField(showInGet = true)
	private String tel;
	
	@RestField(showInGet = true)
	private List<String> emails;
	
	@RestField(showInGet = true)
	private String authorizedPerson;
	
	@RestField(showInIndex = true, showInGet=true)
	private Date requestDate;
	
	@RestField(showInIndex = true, showInGet=true)
	private Date serviceDate;
	
	@RestField(showInGet = true, defaultValue="techSupport")
	private String serviceType;
	
	@RestField(showInGet = true, selection={"str.remoteSupport", "str.localSupport"})
	private String scope;
	
	@RestField(showInGet = true)
	private String serviceDefinition;
	
	@RestField(showInGet = true)
	private String usedMaterial;
	
	@RestField(showInGet = true, showInIndex=true)
	private Boolean contracted = new Boolean(false); 
	
	@RestField(showInGet = true)
	private String serviceDescription;
	
	@RestField(showInGet = true, isTimePicker=true)
	private String startTime;
	
	@RestField(showInGet = true, isTimePicker=true)
	private String finishTime;
	
	@RestField(showInGet = true)
	private String duration;
	
	@RestField(showInGet = true, selection={"str.servicePayment", "str.manHour"}, showInIndex=true)
	private String pricing;
	
	@Fetch
	@RestField(showInGet = false)
	@RelatedTo(type="serviceformpricing_serviceForms", direction=Direction.OUTGOING)
	@RestRelation(relationTitleField="title", type=Relation.ONETOMANY, target=User.class, mappedBy="serviceforms")
	private ServiceFormPricing serviceFormPricing;
	
	@Fetch
	@RestField(showInGet = true)
	@RelatedTo(type="employee_serviceForms", direction=Direction.OUTGOING)
	@RestRelation(relationTitleField="fullname", type=Relation.MANYTOONE, target=User.class, mappedBy="serviceforms")
	private User employee;
	
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

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
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

	public Date getRequestDate() {
		return requestDate;
	}

	public void setRequestDate(Date requestDate) {
		this.requestDate = requestDate;
	}

	public String getCustomerTitle() {
		return customerTitle;
	}

	public void setCustomerTitle(String customerTitle) {
		this.customerTitle = customerTitle;
	}

	public Date getServiceDate() {
		return serviceDate;
	}

	public void setServiceDate(Date serviceDate) {
		this.serviceDate = serviceDate;
	}

	public String getServiceType() {
		return serviceType;
	}

	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}

	public String getScope() {
		return scope;
	}

	public void setScope(String scope) {
		this.scope = scope;
	}

	public String getServiceDefinition() {
		return serviceDefinition;
	}

	public void setServiceDefinition(String serviceDefinition) {
		this.serviceDefinition = serviceDefinition;
	}

	public String getUsedMaterial() {
		return usedMaterial;
	}

	public void setUsedMaterial(String usedMaterial) {
		this.usedMaterial = usedMaterial;
	}

	public String getServiceDescription() {
		return serviceDescription;
	}

	public void setServiceDescription(String serviceDescription) {
		this.serviceDescription = serviceDescription;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public ServiceFormPricing getServiceFormPricing() {
		return serviceFormPricing;
	}

	public void setServiceFormPricing(ServiceFormPricing serviceFormPricing) {
		this.serviceFormPricing = serviceFormPricing;
	}

	public String getFinishTime() {
		return finishTime;
	}

	public void setFinishTime(String finishTime) {
		this.finishTime = finishTime;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getPricing() {
		return pricing;
	}

	public void setPricing(String pricing) {
		this.pricing = pricing;
	}

	public User getEmployee() {
		return employee;
	}

	public void setEmployee(User employee) {
		this.employee = employee;
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
