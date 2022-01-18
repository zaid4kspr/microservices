package com.projectIF5.servicelivre;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

import com.projectIF5.servicelivre.dao.LivreRepository;
import com.projectIF5.servicelivre.entities.Livre;

@EnableDiscoveryClient
@SpringBootApplication
public class ServiceLivreApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceLivreApplication.class, args);
	}




}
