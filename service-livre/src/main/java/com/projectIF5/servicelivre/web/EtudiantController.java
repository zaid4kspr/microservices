package com.projectIF5.servicelivre.web;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class EtudiantController {
	@GetMapping("/zzz")
	public String myConfigz(){

		return "aaaa";
	}
}
