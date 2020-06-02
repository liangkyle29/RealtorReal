package com.expense.expense.repository;

import com.expense.expense.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
  List<Expense> findByLocation_Id(Integer id);

}
