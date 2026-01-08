package com.mmx;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MmxVehiculesApplication {
    public static void main(String[] args) {
        SpringApplication.run(MmxVehiculesApplication.class, args);
        System.out.println("MMX Véhicules Backend démarré sur http://localhost:8080");
    }
}
