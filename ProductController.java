package com.spring.controller;

import java.io.File;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.ReactProjectOnlineApplication;
import com.spring.entity.Product;
import com.spring.entity.Shade;
import com.spring.repo.ProductRepo;
import com.spring.repo.ShadeRepo;

import org.springframework.web.bind.annotation.RequestParam;



@RestController
@CrossOrigin("*")
public class ProductController {
	
	@Value("${file.upload-dir}")
    private String uploadDir;

    private final ReactProjectOnlineApplication reactProjectOnlineApplication;
	
	@Autowired
	private ProductRepo productrepo;
	private static final Logger logger = LoggerFactory.getLogger(ProductController.class);
    ProductController(ReactProjectOnlineApplication reactProjectOnlineApplication) {
        this.reactProjectOnlineApplication = reactProjectOnlineApplication;
    }
	
//	@PostMapping("/addProduct")
//	public Product addProduct(@RequestBody Product product) {
//		System.out.println(product);
//		product.setStatus("ACTIVE");
//		return productrepo.save(product);
//	}
    @PostMapping("/addProduct")
    public Product addProduct(
            @RequestParam("prod_name") String prod_name,
            @RequestParam("prod_category") String prod_category,
            @RequestParam("prod_quantity") int prod_quantity,
            @RequestParam("prod_price") double prod_price,
            @RequestParam(value = "prod_description", required = false) String prod_description,
            @RequestParam(value = "prod_subcategory", required = false) String prod_subcategory,
            @RequestParam(value = "skin_concern", required = false) String skin_concern,
            @RequestParam(value = "ingredients", required = false) String ingredients,
            @RequestParam(value = "skin_type", required = false) String skin_type,
            
    	@RequestParam(value = "hasShade", required = false, defaultValue = "false") boolean hasShade,

        @RequestParam(value = "shades[0].shadeName", required = false) String shadeName1,
        @RequestParam(value = "shades[0].shadeColor", required = false) String shadeColor1,
        @RequestParam(value = "shades[0].shadeImage1", required = false) MultipartFile shadeImage1_1,
        @RequestParam(value = "shades[0].shadeImage2", required = false) MultipartFile shadeImage1_2,
        @RequestParam(value = "shades[0].shadeImage3", required = false) MultipartFile shadeImage1_3,

        @RequestParam(value = "shades[1].shadeName", required = false) String shadeName2,
        @RequestParam(value = "shades[1].shadeColor", required = false) String shadeColor2,
        @RequestParam(value = "shades[1].shadeImage1", required = false) MultipartFile shadeImage2_1,
        @RequestParam(value = "shades[1].shadeImage2", required = false) MultipartFile shadeImage2_2,
        @RequestParam(value = "shades[1].shadeImage3", required = false) MultipartFile shadeImage2_3,

        @RequestParam(value = "shades[2].shadeName", required = false) String shadeName3,
        @RequestParam(value = "shades[2].shadeColor", required = false) String shadeColor3,
        @RequestParam(value = "shades[2].shadeImage1", required = false) MultipartFile shadeImage3_1,
        @RequestParam(value = "shades[2].shadeImage2", required = false) MultipartFile shadeImage3_2,
        @RequestParam(value = "shades[2].shadeImage3", required = false) MultipartFile shadeImage3_3,

        @RequestParam(value = "shades[3].shadeName", required = false) String shadeName4,
        @RequestParam(value = "shades[3].shadeColor", required = false) String shadeColor4,
        @RequestParam(value = "shades[3].shadeImage1", required = false) MultipartFile shadeImage4_1,
        @RequestParam(value = "shades[3].shadeImage2", required = false) MultipartFile shadeImage4_2,
        @RequestParam(value = "shades[3].shadeImage3", required = false) MultipartFile shadeImage4_3,

        @RequestParam(value = "prod_img1", required = false) MultipartFile prod_img1,
        @RequestParam(value = "prod_img2", required = false) MultipartFile prod_img2,
        @RequestParam(value = "prod_img3", required = false) MultipartFile prod_img3,
        @RequestParam(value = "prod_img4", required = false) MultipartFile prod_img4) {

    Product product = new Product();
    product.setProd_name(prod_name);
    product.setProd_category(prod_category);
    product.setProd_quantity(prod_quantity);
    product.setProd_price(prod_price);
    product.setStatus("ACTIVE");
    product.setHasShade(hasShade);
    product.setProd_description(prod_description);

    product.setProd_img1(saveImageFile(prod_img1));
    product.setProd_img2(saveImageFile(prod_img2));
    product.setProd_img3(saveImageFile(prod_img3));
    product.setProd_img4(saveImageFile(prod_img4));
    product.setProd_subcategory(prod_subcategory);
    product.setSkin_concern(skin_concern);
    product.setIngredients(ingredients);
    product.setSkin_type(skin_type);

    if (hasShade) {
        product.setShadeName1(shadeName1);
        product.setShadeColor1(shadeColor1);
        product.setShadeImage1_1(saveImageFile(shadeImage1_1));
        product.setShadeImage1_2(saveImageFile(shadeImage1_2));
        product.setShadeImage1_3(saveImageFile(shadeImage1_3));

        product.setShadeName2(shadeName2);
        product.setShadeColor2(shadeColor2);
        product.setShadeImage2_1(saveImageFile(shadeImage2_1));
        product.setShadeImage2_2(saveImageFile(shadeImage2_2));
        product.setShadeImage2_3(saveImageFile(shadeImage2_3));

        product.setShadeName3(shadeName3);
        product.setShadeColor3(shadeColor3);
        product.setShadeImage3_1(saveImageFile(shadeImage3_1));
        product.setShadeImage3_2(saveImageFile(shadeImage3_2));
        product.setShadeImage3_3(saveImageFile(shadeImage3_3));

        product.setShadeName4(shadeName4);
        product.setShadeColor4(shadeColor4);
        product.setShadeImage4_1(saveImageFile(shadeImage4_1));
        product.setShadeImage4_2(saveImageFile(shadeImage4_2));
        product.setShadeImage4_3(saveImageFile(shadeImage4_3));
    }

    return productrepo.save(product);
        }
    private String saveImageFile(MultipartFile file) {
            if (file == null || file.isEmpty()) {
                return null;
            }

            try {
                File directory = new File(uploadDir);

                if (!directory.exists()) {
                    directory.mkdirs();
                }

                String originalFilename = file.getOriginalFilename();
                String fileExtension = ".jpg";

                if (originalFilename != null && originalFilename.contains(".")) {
                    fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
                }

                String fileName = System.currentTimeMillis() + "_" + System.nanoTime() + fileExtension;

                File destinationFile = new File(directory, fileName);
                file.transferTo(destinationFile);

                System.out.println("Saved file to: " + destinationFile.getAbsolutePath());

                return fileName;

            } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException("Failed to save image file: " + e.getMessage());
            }
        }
	
	 @GetMapping("/showAllProducts")
	 public List<Product> showAllProducts() {
	List<Product>products=productrepo.findAll();
		 return products;
	 }
	 
	 
	 @DeleteMapping("/deleteById/{prod_id}")
	 public Product deleteById(@PathVariable("prod_id") Long id) {
		 System.out.println("deleted by id:"+id);
		
		 Optional<Product> optProduct=productrepo.findById(id);
		 System.out.println(optProduct.get());
		 if(optProduct.isPresent()) {
			 
			 if(optProduct.get().getStatus()== null) {
				 optProduct.get().setStatus("ACTIVE");
			 }else if(optProduct.get().getStatus().equals("ACTIVE")) {
				 optProduct.get().setStatus("INACTIVE");
			 }else if(optProduct.get().getStatus().equals("INACTIVE")) {
				 optProduct.get().setStatus("ACTIVE");
			 } 
		 }
		 return productrepo.save(optProduct.get());
	 }
	 
	 @GetMapping("/getProductWithShades/{id}")
	 public Product getProductWithShades(@PathVariable Long id) {
	     System.out.println("getProductWithShades : "+id);
	     return productrepo.findById(id).orElse(null);
	 }
	 
	 @GetMapping("/getProductById")
	 public Product getProductById(@RequestParam Long id) {
		 System.out.println("getProductById : "+id);
		 Product product = productrepo.findById(id).orElse(new Product());
		    System.out.println("Description: " + product.getProd_description());
		    return product;
	 }
	 
//	 @PutMapping("/updateById")
//		public Product updateById(@RequestBody Product product) {
//			System.out.println(product);
//			product.setStatus("ACTIVE");
//			return productrepo.save(product);
//		}
	 
	 @PutMapping("/updateById")
	 public Product updateById(
	         @RequestParam("prod_id") Long prod_id,
	         @RequestParam("prod_name") String prod_name,
	         @RequestParam("prod_category") String prod_category,
	         @RequestParam(value = "prod_subcategory", required = false) String prod_subcategory,
	         @RequestParam(value = "skin_concern", required = false) String skin_concern,
	         @RequestParam(value = "ingredients", required = false) String ingredients,
	         @RequestParam(value = "skin_type", required = false) String skin_type,
	         @RequestParam("prod_quantity") int prod_quantity,
	         @RequestParam("prod_price") double prod_price,
	         @RequestParam(value = "prod_description", required = false) String prod_description,
	         @RequestParam(value = "hasShade", required = false, defaultValue = "false") boolean hasShade,
	         
	         @RequestParam(value = "prod_img1", required = false) MultipartFile prod_img1,
	         @RequestParam(value = "prod_img2", required = false) MultipartFile prod_img2,
	         @RequestParam(value = "prod_img3", required = false) MultipartFile prod_img3,
	         @RequestParam(value = "prod_img4", required = false) MultipartFile prod_img4,
	         
	         // Shade 1 parameters
	         @RequestParam(value = "shades[0].shadeName", required = false) String shadeName1,
	         @RequestParam(value = "shades[0].shadeColor", required = false) String shadeColor1,
	         @RequestParam(value = "shades[0].shadeImage1", required = false) MultipartFile shadeImage1_1,
	         @RequestParam(value = "shades[0].shadeImage2", required = false) MultipartFile shadeImage1_2,
	         @RequestParam(value = "shades[0].shadeImage3", required = false) MultipartFile shadeImage1_3,
	         
	         // Shade 2 parameters
	         @RequestParam(value = "shades[1].shadeName", required = false) String shadeName2,
	         @RequestParam(value = "shades[1].shadeColor", required = false) String shadeColor2,
	         @RequestParam(value = "shades[1].shadeImage1", required = false) MultipartFile shadeImage2_1,
	         @RequestParam(value = "shades[1].shadeImage2", required = false) MultipartFile shadeImage2_2,
	         @RequestParam(value = "shades[1].shadeImage3", required = false) MultipartFile shadeImage2_3,
	         
	         // Shade 3 parameters
	         @RequestParam(value = "shades[2].shadeName", required = false) String shadeName3,
	         @RequestParam(value = "shades[2].shadeColor", required = false) String shadeColor3,
	         @RequestParam(value = "shades[2].shadeImage1", required = false) MultipartFile shadeImage3_1,
	         @RequestParam(value = "shades[2].shadeImage2", required = false) MultipartFile shadeImage3_2,
	         @RequestParam(value = "shades[2].shadeImage3", required = false) MultipartFile shadeImage3_3,
	         
	         // Shade 4 parameters
	         @RequestParam(value = "shades[3].shadeName", required = false) String shadeName4,
	         @RequestParam(value = "shades[3].shadeColor", required = false) String shadeColor4,
	         @RequestParam(value = "shades[3].shadeImage1", required = false) MultipartFile shadeImage4_1,
	         @RequestParam(value = "shades[3].shadeImage2", required = false) MultipartFile shadeImage4_2,
	         @RequestParam(value = "shades[3].shadeImage3", required = false) MultipartFile shadeImage4_3) {

	     System.out.println("Updating product ID: " + prod_id);
	     
	     Optional<Product> optProduct = productrepo.findById(prod_id);
	     
	     if (optProduct.isPresent()) {
	         Product product = optProduct.get();
	         
	         // Update text fields
	         product.setProd_name(prod_name);
	         product.setProd_category(prod_category);
	         product.setProd_subcategory(prod_subcategory);
	         product.setSkin_concern(skin_concern);
	         product.setIngredients(ingredients);
	         product.setSkin_type(skin_type);
	         product.setProd_quantity(prod_quantity);
	         product.setProd_price(prod_price);
	         product.setStatus("ACTIVE");
	         product.setHasShade(hasShade);
	         product.setProd_description(prod_description);
	         
	         // Update main product images only if new files are uploaded
	         if (prod_img1 != null && !prod_img1.isEmpty()) {
	             product.setProd_img1(saveImageFile(prod_img1));
	         }
	         if (prod_img2 != null && !prod_img2.isEmpty()) {
	             product.setProd_img2(saveImageFile(prod_img2));
	         }
	         if (prod_img3 != null && !prod_img3.isEmpty()) {
	             product.setProd_img3(saveImageFile(prod_img3));
	         }
	         if (prod_img4 != null && !prod_img4.isEmpty()) {
	             product.setProd_img4(saveImageFile(prod_img4));
	         }
	         
	         // Update shades if hasShade is true
	         if (hasShade) {
	             // Shade 1
	             if (shadeName1 != null) product.setShadeName1(shadeName1);
	             if (shadeColor1 != null) product.setShadeColor1(shadeColor1);
	             if (shadeImage1_1 != null && !shadeImage1_1.isEmpty()) product.setShadeImage1_1(saveImageFile(shadeImage1_1));
	             if (shadeImage1_2 != null && !shadeImage1_2.isEmpty()) product.setShadeImage1_2(saveImageFile(shadeImage1_2));
	             if (shadeImage1_3 != null && !shadeImage1_3.isEmpty()) product.setShadeImage1_3(saveImageFile(shadeImage1_3));
	             
	             // Shade 2
	          // Shade 2
	             if (shadeName2 != null && !shadeName2.trim().isEmpty()) product.setShadeName2(shadeName2);
	             if (shadeColor2 != null && !shadeColor2.trim().isEmpty()) product.setShadeColor2(shadeColor2);
	             if (shadeImage2_1 != null && !shadeImage2_1.isEmpty()) product.setShadeImage2_1(saveImageFile(shadeImage2_1));
	             if (shadeImage2_2 != null && !shadeImage2_2.isEmpty()) product.setShadeImage2_2(saveImageFile(shadeImage2_2));
	             if (shadeImage2_3 != null && !shadeImage2_3.isEmpty()) product.setShadeImage2_3(saveImageFile(shadeImage2_3));
	             
	          // Shade 3
	             if (shadeName3 != null && !shadeName3.trim().isEmpty()) product.setShadeName3(shadeName3);
	             if (shadeColor3 != null && !shadeColor3.trim().isEmpty()) product.setShadeColor3(shadeColor3);
	             if (shadeImage3_1 != null && !shadeImage3_1.isEmpty()) product.setShadeImage3_1(saveImageFile(shadeImage3_1));
	             if (shadeImage3_2 != null && !shadeImage3_2.isEmpty()) product.setShadeImage3_2(saveImageFile(shadeImage3_2));
	             if (shadeImage3_3 != null && !shadeImage3_3.isEmpty()) product.setShadeImage3_3(saveImageFile(shadeImage3_3));

	             // Shade 4
	             if (shadeName4 != null && !shadeName4.trim().isEmpty()) product.setShadeName4(shadeName4);
	             if (shadeColor4 != null && !shadeColor4.trim().isEmpty()) product.setShadeColor4(shadeColor4);
	             if (shadeImage4_1 != null && !shadeImage4_1.isEmpty()) product.setShadeImage4_1(saveImageFile(shadeImage4_1));
	             if (shadeImage4_2 != null && !shadeImage4_2.isEmpty()) product.setShadeImage4_2(saveImageFile(shadeImage4_2));
	             if (shadeImage4_3 != null && !shadeImage4_3.isEmpty()) product.setShadeImage4_3(saveImageFile(shadeImage4_3));
	         }
	         else {
	        	    product.setShadeName1(null);
	        	    product.setShadeColor1(null);
	        	    product.setShadeImage1_1(null);
	        	    product.setShadeImage1_2(null);
	        	    product.setShadeImage1_3(null);

	        	    product.setShadeName2(null);
	        	    product.setShadeColor2(null);
	        	    product.setShadeImage2_1(null);
	        	    product.setShadeImage2_2(null);
	        	    product.setShadeImage2_3(null);

	        	    product.setShadeName3(null);
	        	    product.setShadeColor3(null);
	        	    product.setShadeImage3_1(null);
	        	    product.setShadeImage3_2(null);
	        	    product.setShadeImage3_3(null);

	        	    product.setShadeName4(null);
	        	    product.setShadeColor4(null);
	        	    product.setShadeImage4_1(null);
	        	    product.setShadeImage4_2(null);
	        	    product.setShadeImage4_3(null);
	        	}

	        	Product updatedProduct = productrepo.save(product);
	         System.out.println("Updated product saved: " + updatedProduct);
	         System.out.println("=== SHADE 2 DEBUG ===");
	         System.out.println("shadeName2: [" + shadeName2 + "]");
	         System.out.println("shadeColor2: [" + shadeColor2 + "]");
	         System.out.println("shadeImage2_1: " + (shadeImage2_1 != null ? shadeImage2_1.getOriginalFilename() : "NULL"));
	         System.out.println("shadeImage2_2: " + (shadeImage2_2 != null ? shadeImage2_2.getOriginalFilename() : "NULL"));
	         System.out.println("shadeImage2_3: " + (shadeImage2_3 != null ? shadeImage2_3.getOriginalFilename() : "NULL"));
	         System.out.println("hasShade: " + hasShade);
	         System.out.println("==================");
	         return updatedProduct;
	     }
	     
	     return null;
	 }
	 @GetMapping("/getProductInfoById")
	 public Product getProductInfoById(@RequestParam Long id) {
		 System.out.println("getProductById : "+id);
	 	return productrepo.findById(id).orElse(new Product());
	 }
	 
	 
	 @GetMapping("/productByCategory/{category}")
	 public List<Product> getMethodName(@PathVariable String category) {
		 System.out.println("category:"+category);
		 
		 List<Product> listProducts= productrepo.findByProd_category(category);
		 return listProducts;
	 }
	 
	 @GetMapping("/productBySubcategory/{subcategory}")
	 public List<Product> getProductBySubcategory(@PathVariable String subcategory) {
	     System.out.println("subcategory:" + subcategory);
	     List<Product> listProducts = productrepo.findByProd_subcategory(subcategory);
	     System.out.println("Found products: " + listProducts.size());
	     return listProducts;
	 }

	 
	 
	 
	 
	 
	 @Autowired
	 private ShadeRepo shadeRepo;

	 @GetMapping("/getShadesByProduct/{productId}")
	 public List<Shade> getShadesByProduct(@PathVariable Long productId) {
	     return shadeRepo.findByProductId(productId);
	 }
	 
	 @PostMapping(value = "/addShade", consumes = "multipart/form-data")
	 public Shade addShade(
	         @RequestParam("productId") Long productId,
	         @RequestParam("shade_name") String shadeName,
	         @RequestParam("shade_color") String shadeColor,
	         @RequestParam(value = "stock", required = false, defaultValue = "0") int stock,
	         @RequestParam(value = "shade_image1", required = false) MultipartFile shadeImage1,
	         @RequestParam(value = "shade_image2", required = false) MultipartFile shadeImage2,
	         @RequestParam(value = "shade_image3", required = false) MultipartFile shadeImage3
	 ) {
	     Shade shade = new Shade();

	     shade.setProductId(productId);
	     shade.setShade_name(shadeName);
	     shade.setShade_color(shadeColor);
	     shade.setStock(stock);

	     shade.setShade_image1(saveImageFile(shadeImage1));
	     shade.setShade_image2(saveImageFile(shadeImage2));
	     shade.setShade_image3(saveImageFile(shadeImage3));

	     return shadeRepo.save(shade);
	 }

	 
	 @PutMapping(value = "/updateShade/{shadeId}", consumes = "multipart/form-data")
	 public Shade updateShade(
	         @PathVariable Long shadeId,
	         @RequestParam("productId") Long productId,
	         @RequestParam("shade_name") String shadeName,
	         @RequestParam("shade_color") String shadeColor,
	         @RequestParam(value = "stock", required = false, defaultValue = "0") int stock,
	         @RequestParam(value = "shade_image1", required = false) MultipartFile shadeImage1,
	         @RequestParam(value = "shade_image2", required = false) MultipartFile shadeImage2,
	         @RequestParam(value = "shade_image3", required = false) MultipartFile shadeImage3
	 ) {
	     Shade shade = shadeRepo.findById(shadeId).orElse(new Shade());

	     shade.setShade_id(shadeId);
	     shade.setProductId(productId);
	     shade.setShade_name(shadeName);
	     shade.setShade_color(shadeColor);
	     shade.setStock(stock);

	     if (shadeImage1 != null && !shadeImage1.isEmpty()) {
	         shade.setShade_image1(saveImageFile(shadeImage1));
	     }

	     if (shadeImage2 != null && !shadeImage2.isEmpty()) {
	         shade.setShade_image2(saveImageFile(shadeImage2));
	     }

	     if (shadeImage3 != null && !shadeImage3.isEmpty()) {
	         shade.setShade_image3(saveImageFile(shadeImage3));
	     }

	     return shadeRepo.save(shade);
	 }
	 
	 @DeleteMapping("/deleteShade/{shadeId}")
	 public void deleteShade(@PathVariable Long shadeId) {
	     shadeRepo.deleteById(shadeId);
	 }
	

}
