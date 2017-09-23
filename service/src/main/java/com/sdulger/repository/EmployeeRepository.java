package com.sdulger.repository;

import com.sdulger.model.Employee;
import java.lang.Boolean;
import java.lang.Long;
import java.lang.String;
import java.util.Date;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

public interface EmployeeRepository extends GraphRepository<Employee> {
  Employee findById(Long id);

  Employee findByName(String name);

  Employee findByCreatedById(Long id);

  Employee findByOwnerId(Long id);

  Employee findByUpdatedById(Long id);

  Employee findByCreatedAt(Date createdAt);

  Employee findByUpdatedAt(Date updatedAt);

  Employee findByDeleted(Boolean deleted);

  @Query(
          "MATCH (n:Employee) WHERE ((n.deleted IS NULL) OR (n.deleted=false)) RETURN n "
  )
  Page<Employee> findAll(Pageable page);
}
