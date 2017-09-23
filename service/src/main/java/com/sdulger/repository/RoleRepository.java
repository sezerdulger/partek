package com.sdulger.repository;

import com.sdulger.model.Role;
import java.lang.Boolean;
import java.lang.Long;
import java.lang.String;
import java.util.Date;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

public interface RoleRepository extends GraphRepository<Role> {
  Role findById(Long id);

  Role findByTitle(String title);

  Role findByCreatedById(Long id);

  Role findByOwnerId(Long id);

  Role findByUpdatedById(Long id);

  Role findByCreatedAt(Date createdAt);

  Role findByUpdatedAt(Date updatedAt);

  Role findByDeleted(Boolean deleted);

  @Query(
          "MATCH (n:Role) WHERE ((n.deleted IS NULL) OR (n.deleted=false)) RETURN n "
  )
  Page<Role> findAll(Pageable page);
}
