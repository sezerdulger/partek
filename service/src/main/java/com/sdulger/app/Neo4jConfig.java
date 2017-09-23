package com.sdulger.app;

import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.Relationship;
import org.neo4j.graphdb.factory.GraphDatabaseFactory;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.neo4j.config.EnableNeo4jRepositories;
import org.springframework.data.neo4j.config.Neo4jConfiguration;
import org.springframework.data.neo4j.core.TypeRepresentationStrategy;
import org.springframework.data.neo4j.support.typerepresentation.NoopRelationshipTypeRepresentationStrategy;
import org.springframework.scheduling.annotation.EnableScheduling;

@Configuration
@EnableAutoConfiguration
@EnableScheduling
@EnableNeo4jRepositories(basePackages = { "com.sdulger" })
public class Neo4jConfig extends Neo4jConfiguration {
	
	public Neo4jConfig() {
        setBasePackage("com.sdulger");
    }
	
	@Bean
	GraphDatabaseService graphDatabaseService() {
		//GraphDatabaseService db =  new SpringCypherRestGraphDatabase("http://localhost:7474/db/data/");
		GraphDatabaseService db =  new GraphDatabaseFactory().newEmbeddedDatabase("restapp.db");
		    return db;
	}
	
	@Override
    public TypeRepresentationStrategy<Relationship> relationshipTypeRepresentationStrategy() throws Exception {
        return new NoopRelationshipTypeRepresentationStrategy();
    }
	
/*
	@Bean
	GraphDatabaseService graphDatabaseService() {
		GraphDatabaseService db =  new GraphDatabaseFactory().newEmbeddedDatabase("restapp.db");
		    return db;
	}
*/
	/*
	@Autowired Environment env;

    @Override
    public SessionFactory getSessionFactory() {
        return new SessionFactory("org.neo4j.cineasts.domain");
    }

    @Bean
    public Neo4jServer neo4jServer() {
        return new RemoteServer("http://localhost:7474/db/data");
    }

    @Override
    @Bean
    @Scope(value = "session", proxyMode = ScopedProxyMode.TARGET_CLASS)
    public Session getSession() throws Exception {
        return super.getSession();
    }
	@Bean
    ApplicationListener<BeforeSaveEvent> beforeSaveEventApplicationListener() {
        return new ApplicationListener<BeforeSaveEvent>() {
            @Override
            public void onApplicationEvent(BeforeSaveEvent event) {
            	System.out.println("Before save");
            }
        };
    }
*/
	/*
    @Bean
    ApplicationListener<AfterSaveEvent> afterSaveEventApplicationListener() {
        return new ApplicationListener<AfterSaveEvent>() {
            @Override
            public void onApplicationEvent(AfterSaveEvent event) {
            	
            	if (event.getEntity() instanceof Settings) {
            		System.out.println("After save settings");	
            	}
			}
		};
    }

    @Bean
    ApplicationListener<AfterDeleteEvent> deleteEventApplicationListener() {
        return new ApplicationListener<AfterDeleteEvent>() {
            @Override
            public void onApplicationEvent(AfterDeleteEvent event) {
            }
        };
    }*/
}