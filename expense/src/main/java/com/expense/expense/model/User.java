package com.expense.expense.model;

import java.util.Set;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name="user")
public class User {
  
  @Id
  @GeneratedValue
  private int id;
  
  private String name;
  private String email;
  
  @OneToMany
  private Set<Category> category;
  
  
}
