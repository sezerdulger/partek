package com.partek;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.neo4j.graphdb.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.partek.model.Customer;
import com.partek.model.ServiceForm;
import com.partek.repository.ServiceFormRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = ServiceApplication.class)
@WebAppConfiguration
public class ServiceApplicationTests {
	@Autowired
	ServiceFormRepository serviceFormRepository;

	@Test
	public void contextLoads() {
		testServiceForm();
	}

	public void testServiceForm() {
		Transaction tx = ServiceApplicationConfig.getInstance().graphDatabase.beginTx();

		try {
			ServiceForm form = new ServiceForm();
			form.setCustomer(new Customer());
			serviceFormRepository.save(form);
			tx.success();
		} finally {
			tx.close();
		}
	}

}
