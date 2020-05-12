package com.expense.expense.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.expense.expense.model.Category;


public interface CategoryRepository extends JpaRepository<Category, Integer> {
  Category findByName(String name);
  
}
