package com.projectIF5.servicelivre.dao;

import org.springframework.data.jpa.repository.JpaRepository;


import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.projectIF5.servicelivre.entities.Livre;

@RepositoryRestResource
public interface LivreRepository extends JpaRepository<Livre,Long> {

}
