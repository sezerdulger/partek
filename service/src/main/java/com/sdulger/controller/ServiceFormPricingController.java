package com.sdulger.controller;

import com.sdulger.app.ServiceApplicationConfig;
import com.sdulger.model.ServiceFormPricing;
import com.sdulger.restservice.ServiceFormPricingRestService;
import java.lang.String;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;
import org.neo4j.graphdb.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/serviceformpricing")
public class ServiceFormPricingController {
  @Autowired
  public ServiceFormPricingRestService service;

  @RequestMapping(
      value = "/index",
      method = RequestMethod.GET
  )
  public String index(Model model) {
    return "rest/serviceformpricing/partial/index";
  }

  @RequestMapping(
      value = "/get",
      method = RequestMethod.GET
  )
  public String get(Model model) {
    return "rest/serviceformpricing/partial/get";
  }

  @RequestMapping(
      value = "/select",
      method = RequestMethod.GET
  )
  public String select(Model model) {
    return "rest/serviceformpricing/partial/select";
  }

  @RequestMapping(
      value = "/create",
      method = RequestMethod.GET
  )
  public String create(Model model) {
    return "rest/serviceformpricing/partial/create";
  }
}
