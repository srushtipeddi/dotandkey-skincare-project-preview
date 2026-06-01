import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import baseUrl from '../../../BaseUrl/BaseUel';
import './ProductInfo.css';

function ProductInfo() {
  const param = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [selectedShadeIndex, setSelectedShadeIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [shadeImages, setShadeImages] = useState([]);
  const [dbShades, setDbShades] = useState([]);

  const getImageUrl = (image) => {
    if (!image) return '';
    const filename = image.split('/').pop().split('\\').pop();
    return `${baseUrl}/images/${filename}`;
  };

  useEffect(() => {
    const id = param.id;
    setLoading(true);

    axios.get(`${baseUrl}/getProductWithShades/${id}`)
      .then((response) => {
        const data = response.data;
        console.log('PRODUCT DATA:', data);
        setProduct(data);
        return axios.get(`${baseUrl}/getShadesByProduct/${data.prod_id}`);
      })
      .then((shadeResponse) => {
        console.log('SHADES DATA:', shadeResponse.data);
        setDbShades(shadeResponse.data || []);
        setSelectedShadeIndex(0);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error:', error);
        alert('Failed to load product');
        setLoading(false);
      });
  }, [param.id]);

  const getMainProductImages = () => {
    return [
      product?.prod_img1,
      product?.prod_img2,
      product?.prod_img3,
      product?.prod_img4
    ].filter(img => img && img !== '');
  };

  const shades = useMemo(() => {
    if (!product || !product.hasShade) return [];

    if (dbShades.length > 0) {
      return dbShades.map((shade, index) => ({
        name: shade.shade_name || `Shade ${index + 1}`,
        color: shade.shade_color || '#e60023',
        images: [
          shade.shade_image1,
          shade.shade_image2,
          shade.shade_image3
        ].filter(img => img && img.trim() !== '')
      }));
    }

    const oldColumnShades = [];

    for (let i = 1; i <= 4; i++) {
      const shadeName = product[`shadeName${i}`];
      const shadeColor = product[`shadeColor${i}`];

      const images = [
        product[`shadeImage${i}_1`],
        product[`shadeImage${i}_2`],
        product[`shadeImage${i}_3`]
      ].filter(img => img && img.trim() !== '');

      if ((shadeName && shadeName.trim() !== '') || images.length > 0) {
        oldColumnShades.push({
          name: shadeName && shadeName.trim() !== '' ? shadeName : `Shade ${i}`,
          color: shadeColor || '#e60023',
          images
        });
      }
    }

    return oldColumnShades;
  }, [product, dbShades]);

  const hasShades = shades.length > 0;

  useEffect(() => {
    if (!product) return;

    if (hasShades && shades[0]?.images.length > 0) {
      setMainImage(shades[0].images[0]);
      setShadeImages(shades[0].images);
    } else {
      const mainImages = getMainProductImages();

      if (mainImages.length > 0) {
        setMainImage(mainImages[0]);
        setShadeImages(mainImages);
      } else {
        setMainImage(null);
        setShadeImages([]);
      }
    }
  }, [product, shades, hasShades]);

  const handleShadeClick = (shade, index) => {
    setSelectedShadeIndex(index);

    if (shade.images && shade.images.length > 0 && shade.images[0]) {
      setMainImage(shade.images[0]);
      setShadeImages(shade.images);
    } else {
      const mainImages = getMainProductImages();
      setShadeImages(mainImages);
      setMainImage(mainImages[0] || null);
    }
  };

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const handleAddToCart = () => {
    const email = localStorage.getItem('userEmail');

    if (!email) {
      alert('Please login first');
      navigate('/login');
      return;
    }

    if (product.status === 'INACTIVE') {
      alert('This product is out of stock');
      return;
    }

    const cartData = {
      product_id: product.prod_id,
      product_quantity: quantity,
      user_email: email,
      shadeName: hasShades ? shades[selectedShadeIndex]?.name : '',
      shadeColor: hasShades ? shades[selectedShadeIndex]?.color : ''
    };

    setIsAdding(true);

    axios.post(`${baseUrl}/addToCart`, cartData)
      .then(() => {
        window.dispatchEvent(new Event('cartUpdated'));
        alert('Product added to cart!');
        navigate('/cart-info');
      })
      .catch((error) => {
        console.log('Add to cart error:', error);
        alert('Failed to add product to cart');
      })
      .finally(() => {
        setIsAdding(false);
      });
  };

  const handleBuyNow = () => {
    if (product.status === 'INACTIVE') {
      alert('This product is out of stock');
      return;
    }

    navigate(`/customer-info/${product.prod_id}`, {
      state: {
        quantity,
        shadeName: hasShades ? shades[selectedShadeIndex]?.name : '',
        shadeColor: hasShades ? shades[selectedShadeIndex]?.color : ''
      }
    });
  };

  if (loading) {
    return (
      <div className="pi-loading">
        <div className="pi-spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pi-error">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/userhome')}>Back to Shop</button>
      </div>
    );
  }

  const isOutOfStock = product.status === 'INACTIVE' || product.prod_quantity === 0;
  const currentShade = hasShades ? shades[selectedShadeIndex] : null;

  const skinTypes = product.skin_type
    ? product.skin_type.split(',').filter((type) => type.trim() !== '')
    : [];

  return (
    <div className="pi-container">
      <div className="pi-content">
        <div className="pi-image-section">
          <div className="pi-main-image-wrapper">
            {isOutOfStock && <div className="pi-out-of-stock-overlay">Out of Stock</div>}
            {mainImage && (
              <img
                src={getImageUrl(mainImage)}
                alt={product.prod_name}
                className="pi-main-image"
              />
            )}
          </div>

          {shadeImages.length > 0 && (
            <div className="pi-thumbnails">
              {shadeImages.slice(0, 3).map((img, index) => (
                <div
                  key={index}
                  className={`pi-thumbnail ${mainImage === img ? 'pi-active' : ''}`}
                  onClick={() => handleThumbnailClick(img)}
                >
                  <img src={getImageUrl(img)} alt={`Thumb ${index + 1}`} />
                </div>
              ))}
            </div>
          )}

          {hasShades && (
            <div className="pi-shade-section-under-image">
              <p className="pi-shade-label">SHADES</p>
              <div className="pi-shade-colors">
                {shades.map((shade, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`pi-shade-dot ${selectedShadeIndex === index ? 'active' : ''}`}
                    style={{ backgroundColor: shade.color }}
                    onClick={() => handleShadeClick(shade, index)}
                    title={shade.name}
                  />
                ))}
              </div>
              {currentShade && (
                <p className="pi-selected-shade-name">{currentShade.name}</p>
              )}
            </div>
          )}
        </div>

        <div className="pi-info-section">
          <div className="pi-header">
            <h1 className="pi-title">{product.prod_name}</h1>
            <span className="pi-category-badge">{product.prod_category}</span>
          </div>

          <div className="pi-price-section">
            <p className="pi-price">₹{product.prod_price}</p>
            <p className={`pi-stock ${isOutOfStock ? 'pi-out-of-stock' : 'pi-in-stock'}`}>
              {isOutOfStock ? 'Out of Stock' : `In Stock: ${product.prod_quantity}`}
            </p>
          </div>

          {product.prod_description && (
            <div className="pi-description-box">
              <h3>DESCRIPTION</h3>
              <p>{product.prod_description}</p>
            </div>
          )}

          <div className="pi-details-grid">
            <div className="pi-detail-item">
              <span className="pi-detail-label">PRODUCT ID</span>
              <span className="pi-detail-value">{product.prod_id}</span>
            </div>

            <div className="pi-detail-item">
              <span className="pi-detail-label">CATEGORY</span>
              <span className="pi-detail-value">{product.prod_category}</span>
            </div>

            {skinTypes.length > 0 && (
              <div className="pi-detail-item">
                <span className="pi-detail-label">SKIN TYPE</span>
                <span className="pi-detail-value">{skinTypes.join(', ')}</span>
              </div>
            )}

            <div className="pi-detail-item">
              <span className="pi-detail-label">STATUS</span>
              <span className={`pi-detail-value ${product.status === 'ACTIVE' ? 'status-active' : 'status-inactive'}`}>
                {product.status}
              </span>
            </div>
          </div>

          <div className="pi-quantity-section">
            <label>Quantity:</label>
            <div className="pi-quantity-control">
              <button
                className="pi-qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={isOutOfStock || isAdding}
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                disabled={isOutOfStock || isAdding}
                className="pi-qty-input"
              />
              <button
                className="pi-qty-btn"
                onClick={() => setQuantity(Math.min(product.prod_quantity, quantity + 1))}
                disabled={isOutOfStock || isAdding}
              >
                +
              </button>
            </div>
          </div>

          <div className="pi-buttons">
            <button
              className="pi-btn pi-btn-add-to-cart"
              onClick={handleAddToCart}
              disabled={isOutOfStock || isAdding}
            >
              {isAdding ? 'Adding...' : '🛒 Add to Cart'}
            </button>
            <button
              className="pi-btn pi-btn-buy-now"
              onClick={handleBuyNow}
              disabled={isOutOfStock || isAdding}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;