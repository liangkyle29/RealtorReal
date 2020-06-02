package com.expense.expense.controller;

import com.expense.expense.security.AuthenticationBean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BasicAuthenticationController {

  @GetMapping(path = "/basicauth")
  public AuthenticationBean authenticate() {
    return new AuthenticationBean("You are authenticated");

  }
}
