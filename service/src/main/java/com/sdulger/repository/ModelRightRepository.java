package com.sdulger.repository;

import com.sdulger.model.ModelRight;
import java.lang.Boolean;
import java.lang.Long;
import java.lang.String;
import java.util.Date;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

public interface ModelRightRepository extends GraphRepository<ModelRight> {
  ModelRight findById(Long id);

  ModelRight findByRoleId(Long id);

  ModelRight findByModel(String model);

  ModelRight findByRead(Boolean read);

  ModelRight findByCreate(Boolean create);

  ModelRight findByEdit(Boolean edit);

  ModelRight findByDelete(Boolean delete);

  ModelRight findByCreatedById(Long id);

  ModelRight findByOwnerId(Long id);

  ModelRight findByUpdatedById(Long id);

  ModelRight findByCreatedAt(Date createdAt);

  ModelRight findByUpdatedAt(Date updatedAt);

  ModelRight findByDeleted(Boolean deleted);

  @Query(
          "MATCH (n:ModelRight) WHERE ((n.deleted IS NULL) OR (n.deleted=false)) RETURN n "
  )
  Page<ModelRight> findAll(Pageable page);
}
