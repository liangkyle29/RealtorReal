package com.expense.expense.model;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@NoArgsConstructor
@Entity
@Data
@Table(name="expense")
public class Expense {

  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private int id;

  @Column(nullable = true)
  private Integer itemNumber;

  @Column(nullable = true)
  private String item;

  @NonNull
  private Date date;

  @NonNull
  private float amount;

  @Column(nullable = true)
  private String store;

  @ManyToOne
  @Column(nullable = false)
  private Category category;

  @ManyToOne
  @Column(nullable = false)
  private Location location;

  
   
}
