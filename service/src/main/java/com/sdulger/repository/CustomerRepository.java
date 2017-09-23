package com.sdulger.repository;

import com.sdulger.model.Customer;
import java.lang.Boolean;
import java.lang.Long;
import java.lang.String;
import java.util.Date;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

public interface CustomerRepository extends GraphRepository<Customer> {
  Customer findById(Long id);

  Customer findByTitle(String title);

  Customer findByAddress(String address);

  Customer findByTel(String tel);

  Customer findByContracted(Boolean contracted);

  @Query(
          "MATCH a where ({0} in a.emails) return a"
  )
  Customer findByEmails(String emails);

  Customer findByAuthorizedPerson(String authorizedPerson);

  Customer findByCreatedById(Long id);

  Customer findByOwnerId(Long id);

  Customer findByUpdatedById(Long id);

  Customer findByCreatedAt(Date createdAt);

  Customer findByUpdatedAt(Date updatedAt);

  Customer findByDeleted(Boolean deleted);

  @Query(
          "MATCH (n:Customer) WHERE ((n.deleted IS NULL) OR (n.deleted=false)) RETURN n "
  )
  Page<Customer> findAll(Pageable page);
}
