package com.expense.expense.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {

  @RequestMapping(value = {"/","/login","/gemini","/blue","/ocean","/categories","/expenses","/logout"})
  public String index(){
    return "/index.html";
  }



}
