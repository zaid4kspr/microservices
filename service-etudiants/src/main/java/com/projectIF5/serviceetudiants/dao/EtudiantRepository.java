package com.projectIF5.serviceetudiants.dao;

import org.springframework.data.jpa.repository.JpaRepository;


import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.projectIF5.serviceetudiants.entities.Etudiant;

@RepositoryRestResource
public interface EtudiantRepository extends JpaRepository<Etudiant,Long> {

}
