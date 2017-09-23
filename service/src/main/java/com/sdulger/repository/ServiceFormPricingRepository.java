package com.sdulger.repository;

import com.sdulger.model.ServiceFormPricing;
import java.lang.Boolean;
import java.lang.Long;
import java.lang.String;
import java.util.Date;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

public interface ServiceFormPricingRepository extends GraphRepository<ServiceFormPricing> {
  ServiceFormPricing findById(Long id);

  ServiceFormPricing findByTitle(String title);

  ServiceFormPricing findByCreatedById(Long id);

  ServiceFormPricing findByOwnerId(Long id);

  ServiceFormPricing findByUpdatedById(Long id);

  ServiceFormPricing findByCreatedAt(Date createdAt);

  ServiceFormPricing findByUpdatedAt(Date updatedAt);

  ServiceFormPricing findByDeleted(Boolean deleted);

  @Query(
          "MATCH (n:ServiceFormPricing) WHERE ((n.deleted IS NULL) OR (n.deleted=false)) RETURN n "
  )
  Page<ServiceFormPricing> findAll(Pageable page);
}
