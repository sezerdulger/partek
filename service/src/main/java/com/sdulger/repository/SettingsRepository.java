package com.sdulger.repository;

import com.sdulger.model.Settings;
import java.lang.Boolean;
import java.lang.Long;
import java.lang.String;
import java.util.Date;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

public interface SettingsRepository extends GraphRepository<Settings> {
  Settings findById(Long id);

  Settings findByLanguage(String language);

  Settings findByCreatedById(Long id);

  Settings findByOwnerId(Long id);

  Settings findByUpdatedById(Long id);

  Settings findByCreatedAt(Date createdAt);

  Settings findByUpdatedAt(Date updatedAt);

  Settings findByDeleted(Boolean deleted);

  @Query(
          "MATCH (n:Settings) WHERE ((n.deleted IS NULL) OR (n.deleted=false)) RETURN n "
  )
  Page<Settings> findAll(Pageable page);
}
