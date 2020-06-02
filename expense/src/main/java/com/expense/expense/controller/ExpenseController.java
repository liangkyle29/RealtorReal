package com.expense.expense.controller;

import com.expense.expense.model.Expense;
import com.expense.expense.repository.ExpenseRepository;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ExpenseController {

  @Autowired
  private ExpenseRepository expenseRepository;

  @GetMapping("/expenses")
  List<Expense> getExpenses(){
    return expenseRepository.findAll();
  }

  @GetMapping("/expense/{locid}")
  List<Expense> getExpense(@PathVariable Integer locid){
    return expenseRepository.findByLocation_Id(locid);
  }

  @PostMapping("/expense")
  ResponseEntity<Expense> createExpense(@Valid @RequestBody Expense expense) throws URISyntaxException{
    Expense result = expenseRepository.save(expense);
    return ResponseEntity.created(new URI("/api/expense"+result.getId())).body(result);
  }


  @DeleteMapping("/expense/{id}")
  ResponseEntity<?> deleteExpense(@PathVariable Integer id){
    expenseRepository.deleteById(id);
    return ResponseEntity.ok().build();
  }
}
