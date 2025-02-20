package com.example.e_comPro.repository;

import com.example.e_comPro.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {
    @Query("SELECT p from Product p where "+
            "LOWER(p.name) LIKE LOWER(CONCAT('%',:query,'%')) OR "+
            "LOWER(p.desc) LIKE LOWER(CONCAT('%',:query,'%')) OR "+
            "LOWER(p.brand) LIKE LOWER(CONCAT('%',:query,'%')) OR "+
            "LOWER(p.category) LIKE LOWER(CONCAT('%',:query,'%'))")
    List<Product> findByName(String query);
}
