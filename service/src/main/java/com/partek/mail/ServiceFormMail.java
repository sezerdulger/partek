package com.partek.mail;

import java.util.List;

import com.sdulger.model.ServiceForm;

public class ServiceFormMail {
	private ServiceForm serviceform;
	private List<String> emails;
	public ServiceForm getServiceform() {
		return serviceform;
	}
	public void setServiceform(ServiceForm serviceform) {
		this.serviceform = serviceform;
	}
	public List<String> getEmails() {
		return emails;
	}
	public void setEmails(List<String> emails) {
		this.emails = emails;
	}
}
