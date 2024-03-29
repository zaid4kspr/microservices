package com.projectIF5.serviceadmins;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

import com.projectIF5.serviceadmins.dao.AdminRepository;
import com.projectIF5.serviceadmins.entities.Admin;

@EnableDiscoveryClient
@SpringBootApplication
public class ServiceAdminsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceAdminsApplication.class, args);
	}

	

}
