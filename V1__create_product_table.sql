CREATE TABLE IF NOT EXISTS product (
    prod_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    prod_name VARCHAR(255),
    prod_category VARCHAR(255),
    prod_quantity INT,
    prod_price DOUBLE,
    status VARCHAR(50)
);