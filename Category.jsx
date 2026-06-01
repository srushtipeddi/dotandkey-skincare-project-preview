import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import baseUrl from '../../../BaseUrl/BaseUel';

function Category() {
    const param =useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [userEmail, setuserEmail] = useState()
    const [loading, setLoading] = useState(false);
 
    useEffect(() => {
      const category=param.category;
        console.log("Searching for category:", category); 
        setLoading(true);
        axios.get(`${baseUrl}/productBySubcategory/${category}`)
        .then((response)=>{
            console.log("API Response:", response.data);
            console.log("Number of products:", response.data.length);
            setProducts(response.data); 
        }).catch((error)=>{
            alert("server side error",error);
        })
    }, [param]) // this logic for men and women ok 
    

    useEffect(() => {
      const email=localStorage.getItem('userEmail')
      if(email){
        setuserEmail(email);
      }
  }, []);


  const productInfo = (id) => {
    console.log(id);
    navigate(`/product-info/${id}`);
  }

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    const filename = imagePath.split('/').pop().split('\\').pop();
    return `${baseUrl}/images/${filename}`;
  };


  const handleBuyNow=(product) =>{
    console.log("Buy Now Clicked for:",product.prod_id);
    navigate(`/customer-info/${product.prod_id}`)
  }

  const handleAddToCart=(product)=>{
    console.log("Add to cart clicked for:",product.prod_id);
    let cartdata ={
      product_id : product.prod_id,
      product_quantity : 1,
      user_email :userEmail
    }
    console.log(cartdata);
    axios.post(`${baseUrl}/addToCart`,cartdata)
    .then((response)=>{
      console.log(response.data);
    }).catch((error)=>{
    alert("server side error");
    console.log(error);
    
    })
     navigate("/cart-info");
  }

  if (loading) {
        return <div>Loading...</div>;
    }
  


  return (
    <div className="user-home">
            {/* Product Count */}
            <div className="product-count-container">
                <div className="total-product-count">
                    📦 Total Products: <strong>{products.length}</strong>
                </div>
            </div>

            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.prod_id} onClick={() => productInfo(product.prod_id)} className="product-card">
                        {/* Image Container */}
                        <div
                            className="product-image-container"
                            onMouseEnter={() => setHoveredProduct(product.prod_id)}
                            onMouseLeave={() => setHoveredProduct(null)}
                        >
                            <img
                                src={hoveredProduct === product.prod_id ? getImageUrl(product.prod_img2) : getImageUrl(product.prod_img1)}
                                alt={product.prod_name}
                                className="product-image"
                            />
                            {product.status === 'INACTIVE' && (
                                <div className="out-of-stock-badge">Out of Stock</div>
                            )}

                            {/* Stock Badge */}
                            {product.prod_quantity > 0 && (
                                <div className={`stock-badge ${product.prod_quantity < 10 ? 'low-stock' : ''}`}>
                                    {product.prod_quantity} items left
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="product-info">
                            <h3 className="product-name">{product.prod_name}</h3>
                            <p className="product-category">{product.prod_category}</p>
                            <p className="product-price">₹{product.prod_price.toFixed(2)}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="product-actions">
                            <button
                                className="btn btn-buy-now"
                                disabled={product.status === 'INACTIVE'}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleBuyNow(product);
                                }}
                            >
                                Buy Now
                            </button>
                            <button 
                                className="btn btn-add-to-cart"
                                disabled={product.status === 'INACTIVE'}
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    handleAddToCart(product)
                                }}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Category;


