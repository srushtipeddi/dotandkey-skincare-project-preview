package com.spring.repo;

import java.util.List;
import com.spring.entity.Shade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShadeRepo extends JpaRepository<Shade, Long> {
    List<Shade> findByProductId(Long productId);
}
