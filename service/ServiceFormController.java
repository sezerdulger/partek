package com.partek.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.partek.model.ServiceForm;
import com.partek.restservice.ServiceFormRestService;

@Controller
@RequestMapping("/serviceform")
public class ServiceFormController {
	@Autowired
	ServiceFormRestService serviceFormService;
	
	@RequestMapping(value="", method=RequestMethod.GET)
	public String index(Model model) {
		List<ServiceForm> serviceformlist = serviceFormService.index();
		model.addAttribute("serviceformlist", serviceformlist);
		return "rest/serviceform/partial/index";
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public String get(Model model, @PathVariable(value="id") Long id) {
		ServiceForm form = serviceFormService.get(id);
		model.addAttribute("serviceform", form);
		return "rest/serviceform/partial/get";
	}
}
