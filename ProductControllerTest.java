package com.spring.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.spring.ReactProjectOnlineApplication;
import com.spring.entity.Product;
import com.spring.repo.ProductRepo;
import com.spring.repo.ShadeRepo;

public class ProductControllerTest {

    @Mock
    private ProductRepo productrepo;

    @Mock
    private ShadeRepo shadeRepo;

    @Mock
    private ReactProjectOnlineApplication reactProjectOnlineApplication;

    private ProductController productController;

    @BeforeEach
    void setUp() throws Exception {

        MockitoAnnotations.openMocks(this);

        productController =
                new ProductController(reactProjectOnlineApplication);

        // Inject productrepo manually
        Field field =
                ProductController.class.getDeclaredField("productrepo");

        field.setAccessible(true);

        field.set(productController, productrepo);
    }

    @Test
    void testShowAllProducts() {

        Product product1 = new Product();
        product1.setProd_id(1L);
        product1.setProd_name("Test Product 1");

        Product product2 = new Product();
        product2.setProd_id(2L);
        product2.setProd_name("Test Product 2");

        List<Product> mockProducts =
                Arrays.asList(product1, product2);

        when(productrepo.findAll())
                .thenReturn(mockProducts);

        List<Product> result =
                productController.showAllProducts();

        assertNotNull(result);

        assertEquals(2, result.size());

        verify(productrepo, times(1)).findAll();
    }
}