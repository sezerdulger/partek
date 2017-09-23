package com.sdulger.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.sdulger.restservice.EmployeeRestService;

@Controller
@RequestMapping("/employee")
public class EmployeeController {
  @Autowired
  public EmployeeRestService service;

  @RequestMapping(
      value = "/index",
      method = RequestMethod.GET
  )
  public String index(Model model) {
    return "rest/employee/partial/index";
  }

  @RequestMapping(
      value = "/get",
      method = RequestMethod.GET
  )
  public String get(Model model) {
    return "rest/employee/partial/get";
  }

  @RequestMapping(
      value = "/select",
      method = RequestMethod.GET
  )
  public String select(Model model) {
    return "rest/employee/partial/select";
  }

  @RequestMapping(
      value = "/create",
      method = RequestMethod.GET
  )
  public String create(Model model) {
    return "rest/employee/partial/create";
  }
}
