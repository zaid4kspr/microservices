package com.projectIF5.serviceenseignants;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

import com.projectIF5.serviceenseignants.dao.EnseignantRepository;
import com.projectIF5.serviceenseignants.entities.Enseignant;

@EnableDiscoveryClient
@SpringBootApplication
public class ServiceEnseignantsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceEnseignantsApplication.class, args);
	}

	/*
	 * @Bean CommandLineRunner start(EtudiantRepository etudiantRepoitory) { return
	 * args -> {
	 * 
	 * String[] e = {"zaid", "papi", "montanii"};
	 * 
	 * for (int i = 0; i < e.length; i++) { etudiantRepoitory.save(new
	 * Etudiant(null,e[i],e[i],e[i])); } etudiantRepoitory.findAll().forEach(itm->{
	 * System.out.println(itm.toString()); });
	 * 
	 * }; }
	 * 
	 */


}
