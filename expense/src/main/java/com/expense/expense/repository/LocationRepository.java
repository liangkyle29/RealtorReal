package com.expense.expense.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.expense.expense.model.Location;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer> {

}
