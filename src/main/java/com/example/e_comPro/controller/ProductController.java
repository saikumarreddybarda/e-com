package com.example.e_comPro.controller;

import com.example.e_comPro.model.Product;
import com.example.e_comPro.service.ProdService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ProductController {
        @Autowired
        ProdService prodService;
        @RequestMapping("/")
        public String welcome() {
            return "welcome to products";
        }
        @RequestMapping("/getproducts")
        public ResponseEntity<List<Product>> getProducts(){
            return new ResponseEntity<>(prodService.getProducts(), HttpStatus.OK);
        }
        @RequestMapping("/getproducts/{id}")
        public ResponseEntity<Product> getProductById(@PathVariable int id){
            Product product=prodService.getProductsById(id);
            if (product!=null) {
                return new ResponseEntity<>(product, HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

        }
        @PostMapping("/getproducts")
        public ResponseEntity<?> addProducts(@RequestBody Product prod){
            try{

                prodService.addProducts(prod);
                return new ResponseEntity<>(prod,HttpStatus.CREATED);
            }
            catch (Exception e){
                return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
            }


        }
        @PutMapping("/getproducts/{id}")
        public ResponseEntity<?> updateProducts(@PathVariable int id,@RequestBody Product prod){

            try{
                prodService.updateProduct(id,prod);
                return new ResponseEntity<>(id,HttpStatus.CREATED);
            }
            catch (Exception e){
                return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        @DeleteMapping("/getproducts/{id}")
        public ResponseEntity<?> deleteProducts(@PathVariable int id){
            try{
                prodService.deleteProduct(id);
                return new ResponseEntity<>(id,HttpStatus.CREATED);
            }
            catch (Exception e){
                return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        @GetMapping("/getproducts/search")
        public List<Product> searchProducts(@RequestParam String query) {

            return prodService.searchProduct(query);
        }


}
