package com.expense.expense.model;

import java.time.Instant;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Data
@Table(name="expense")
public class Expense {

  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private int id;
  
  private Instant date;
  
  private float amount;
  
  @ManyToOne
  private Category category;

  
   
}
