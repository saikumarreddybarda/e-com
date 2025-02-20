package com.example.e_comPro.service;

import com.example.e_comPro.model.Product;
import com.example.e_comPro.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdService {
    @Autowired
    public ProductRepo proRepo;
    public List<Product> getProducts(){
        return proRepo.findAll();
    }

    public Product getProductsById(int id) {
        return proRepo.findById(id).orElse(new Product());
    }

    public void addProducts(Product prod) {

        proRepo.save(prod);
    }

    public void updateProduct(int id, Product prod) {
        prod.setId(id);
        proRepo.save(prod);
    }

    public void deleteProduct(int id) {
        proRepo.deleteById(id);
    }

    public List<Product> searchProduct(String query) {
        return proRepo.findByName(query);
    }
}
