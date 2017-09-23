package com.sdulger.repository;

import com.sdulger.model.ServiceForm;
import java.lang.Boolean;
import java.lang.Long;
import java.lang.String;
import java.util.Date;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

public interface ServiceFormRepository extends GraphRepository<ServiceForm> {
  ServiceForm findById(Long id);

  ServiceForm findByCustomerId(Long id);

  ServiceForm findByCustomerTitle(String customerTitle);

  ServiceForm findByDepartment(String department);

  ServiceForm findByAddress(String address);

  ServiceForm findByTel(String tel);

  @Query(
          "MATCH a where ({0} in a.emails) return a"
  )
  ServiceForm findByEmails(String emails);

  ServiceForm findByAuthorizedPerson(String authorizedPerson);

  ServiceForm findByRequestDate(Date requestDate);

  ServiceForm findByServiceDate(Date serviceDate);

  ServiceForm findByServiceType(String serviceType);

  ServiceForm findByScope(String scope);

  ServiceForm findByServiceDefinition(String serviceDefinition);

  ServiceForm findByUsedMaterial(String usedMaterial);

  ServiceForm findByContracted(Boolean contracted);

  ServiceForm findByServiceDescription(String serviceDescription);

  ServiceForm findByStartTime(String startTime);

  ServiceForm findByFinishTime(String finishTime);

  ServiceForm findByDuration(String duration);

  ServiceForm findByPricing(String pricing);

  ServiceForm findByServiceFormPricingId(Long id);

  ServiceForm findByEmployeeId(Long id);

  ServiceForm findByCreatedById(Long id);

  ServiceForm findByOwnerId(Long id);

  ServiceForm findByUpdatedById(Long id);

  ServiceForm findByCreatedAt(Date createdAt);

  ServiceForm findByUpdatedAt(Date updatedAt);

  ServiceForm findByDeleted(Boolean deleted);

  @Query(
          "MATCH (n:ServiceForm) WHERE ((n.deleted IS NULL) OR (n.deleted=false)) RETURN n ORDER BY n.requestDate DESC"
  )
  Page<ServiceForm> findAll(Pageable page);
}
