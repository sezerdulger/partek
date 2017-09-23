package com.sdulger.repository;

import com.sdulger.model.User;
import java.lang.Boolean;
import java.lang.Long;
import java.lang.String;
import java.util.Date;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

public interface UserRepository extends GraphRepository<User> {
  User findById(Long id);

  User findByRoleId(Long id);

  User findByFullname(String fullname);

  User findByUsername(String username);

  User findByPassword(String password);

  User findByActive(Boolean active);

  User findByCreatedAt(Date createdAt);

  User findByDeleted(Boolean deleted);

  @Query(
          "MATCH (n:User) WHERE ((n.deleted IS NULL) OR (n.deleted=false)) RETURN n "
  )
  Page<User> findAll(Pageable page);
}
