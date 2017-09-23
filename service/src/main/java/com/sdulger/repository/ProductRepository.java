package com.sdulger.repository;

import com.sdulger.model.Product;
import java.lang.Boolean;
import java.lang.Long;
import java.lang.String;
import java.util.Date;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

public interface ProductRepository extends GraphRepository<Product> {
  Product findById(Long id);

  Product findByName(String name);

  Product findByCustomerId(Long id);

  Product findByCreatedById(Long id);

  Product findByOwnerId(Long id);

  Product findByUpdatedById(Long id);

  Product findByCreatedAt(Date createdAt);

  Product findByUpdatedAt(Date updatedAt);

  Product findByDeleted(Boolean deleted);

  @Query(
          "MATCH (n:Product) WHERE ((n.deleted IS NULL) OR (n.deleted=false)) RETURN n "
  )
  Page<Product> findAll(Pageable page);
}
