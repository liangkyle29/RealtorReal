package com.expense.expense.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Data
@Table(name="location")
public class Location {

  @Id
  @GeneratedValue(strategy= GenerationType.AUTO)
  private int id;

  @Column(nullable = false)
  private String address;
}
