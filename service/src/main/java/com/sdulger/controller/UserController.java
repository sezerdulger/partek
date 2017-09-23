package com.sdulger.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.sdulger.restservice.UserRestService;

@Controller
@RequestMapping("/user")
public class UserController {
  @Autowired
  public UserRestService service;

  @RequestMapping(
      value = "/index",
      method = RequestMethod.GET
  )
  public String index(Model model) {
    return "rest/user/partial/index";
  }

  @RequestMapping(
      value = "/get",
      method = RequestMethod.GET
  )
  public String get(Model model) {
    return "rest/user/partial/get";
  }

  @RequestMapping(
      value = "/select",
      method = RequestMethod.GET
  )
  public String select(Model model) {
    return "rest/user/partial/select";
  }

  @RequestMapping(
      value = "/create",
      method = RequestMethod.GET
  )
  public String create(Model model) {
    return "rest/user/partial/create";
  }
}
