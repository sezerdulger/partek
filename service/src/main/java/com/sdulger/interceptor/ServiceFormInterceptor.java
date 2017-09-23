package com.sdulger.interceptor;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.partek.mail.SendMailTLS;
import com.partek.mail.ServiceFormMail;
import com.sdulger.app.ServiceApplicationConfig;
import com.sdulger.message.ResponseMessage;
import com.sdulger.model.ServiceForm;
import com.sdulger.repository.ServiceFormRepository;
import com.sdulger.util.RestServiceUtil;

@Component
@Controller
public class ServiceFormInterceptor {
	@Autowired
	public ServiceFormRepository repository;
	
	@Autowired
	ServiceApplicationConfig config;

	public ResponseMessage test;
	
	@Autowired
	SendMailTLS mail;

	@Autowired
	public Neo4jTemplate template;

	public void beforeIndex(List model) {
	}

	public void beforeSave(ServiceForm model) {
		if (model != null) {
			model.setUpdatedBy(RestServiceUtil.getInstance().getCreatedBy());
			model.setUpdatedAt(new Date());
			 if (model.getId() == null || model.getId() <= 0) {
		    	  model.setCreatedBy(RestServiceUtil.getInstance().getCreatedBy());
		      }
		}
	}

	public void beforeGet(ServiceForm model) {

	}

	public void beforeCreate(ServiceForm model) {
		if (model != null) {
			model.setCreatedAt(new Date());
			model.setCreatedBy(RestServiceUtil.getInstance().getCreatedBy());
			model.setOwner(RestServiceUtil.getInstance().getCreatedBy());
			model.setUpdatedBy(RestServiceUtil.getInstance().getCreatedBy());

		}
	}

	public void afterIndex(List model) {
	}

	public void afterSave(ServiceForm model) {
	}

	public void afterGet(ServiceForm model) {
	}

	public void afterCreate(ServiceForm model) {
		model.setEmployee(RestServiceUtil.getInstance().getCreatedBy());
		model.setServiceType(config.translate("str.techSupport"));
		model.setCreatedAt(new Date());
		model.setCreatedBy(RestServiceUtil.getInstance().getCreatedBy());
		model.setOwner(RestServiceUtil.getInstance().getCreatedBy());
		model.setUpdatedBy(RestServiceUtil.getInstance().getCreatedBy());
	}

	public void beforeDelete(ServiceForm model) {
	}

	public void afterDelete(ServiceForm model) {
	}

	@RequestMapping(value = "/serviceform/sendmail", method = RequestMethod.GET)
	public String create(Model model) {
		return "rest/serviceform/partial/sendmail";
	}

	@RequestMapping(value = "/serviceform/getmail", method = RequestMethod.POST)
	public @ResponseBody ServiceFormMail mail(@RequestBody ServiceForm serviceform) {
		ServiceFormMail m = new ServiceFormMail();
		m.setServiceform(serviceform);
		m.setEmails(serviceform.getEmails());
		return m;
	}

	@Autowired
	SendMailTLS s;

	@RequestMapping(value = "/serviceform/sendmail", method = RequestMethod.POST)
	public @ResponseBody ResponseMessage sendmailpost(Model model, @RequestBody ServiceFormMail mail) {
		String r = s.send(mail.getServiceform(), mail.getEmails());
		ResponseMessage rm = new ResponseMessage();
		rm.success = true;
		rm.message = r;
		return rm;
	}
	
	@RequestMapping(value = "/serviceform/downloadpdf/{id}", method = RequestMethod.GET)
	public @ResponseBody FileSystemResource downloadpdf(Model model, @PathVariable(value="id") Long id, final HttpServletResponse response) {
		String filepath;
		try {
			ServiceForm serviceform = repository.findById(id);
			filepath = mail.createServiceForm(serviceform);
			FileSystemResource rm = new FileSystemResource(filepath);
			response.setContentType("application/pdf");
			return rm;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
