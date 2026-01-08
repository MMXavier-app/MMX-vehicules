package com.mmx.repository;

import com.mmx.model.Vehicule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehiculeRepository extends JpaRepository<Vehicule, Long> {
    
    // Requête corrigée - sans le champ 'description' qui n'existe pas
    @Query("SELECT v FROM Vehicule v WHERE " +
           "LOWER(v.modele) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(v.marque) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Vehicule> searchByKeyword(@Param("keyword") String keyword);
    
    // Méthodes de recherche supplémentaires
    List<Vehicule> findByModeleContainingIgnoreCase(String modele);
    List<Vehicule> findByMarqueContainingIgnoreCase(String marque);
}
