package com.sdulger.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.sdulger.restservice.SettingsRestService;

@Controller
@RequestMapping("/settings")
public class SettingsController {
  @Autowired
  public SettingsRestService service;

  @RequestMapping(
      value = "/index",
      method = RequestMethod.GET
  )
  public String index(Model model) {
    return "rest/settings/partial/index";
  }

  @RequestMapping(
      value = "/get",
      method = RequestMethod.GET
  )
  public String get(Model model) {
    return "rest/settings/partial/get";
  }

  @RequestMapping(
      value = "/select",
      method = RequestMethod.GET
  )
  public String select(Model model) {
    return "rest/settings/partial/select";
  }

  @RequestMapping(
      value = "/create",
      method = RequestMethod.GET
  )
  public String create(Model model) {
    return "rest/settings/partial/create";
  }
}
