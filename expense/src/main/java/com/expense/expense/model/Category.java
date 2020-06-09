package com.expense.expense.model;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@NoArgsConstructor
@Entity
@Data
@Table(name="category")
public class Category {

  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private int id;

  @Column(nullable = false)
  private String name;

}
