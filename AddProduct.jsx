import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";

const initialShade = {
  shadeName: "",
  shadeColor: "#e60023",
  shadeImage1: null,
  shadeImage2: null,
  shadeImage3: null,
};

const ProductForm = () => {
  const [product, setProduct] = useState({
    prod_name: "",
    prod_category: "",
    prod_subcategory: "",
    skin_concern: "",
    ingredients: "",
    skin_type: "",
    prod_quantity: "",
    prod_price: "",
    prod_img1: null,
    prod_img2: null,
    prod_img3: null,
    prod_img4: null,
    prod_description: "",
  });

  const [hasShade, setHasShade] = useState(false);
  const [shades, setShades] = useState([{ ...initialShade }]);
  const [shadePreviews, setShadePreviews] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [imagePreviews, setImagePreviews] = useState({
    prod_img1: null,
    prod_img2: null,
    prod_img3: null,
    prod_img4: null,
  });

  const categories = [
    "ELECTRONICS",
    "CLOTHING",
    "BOOKS",
    "HOME",
    "SPORTS",
    "BEAUTY",
    "GROCERY",
    "OTHER",
  ];

  const getRandomColor = () => {
    const colors = [
      "#e60023",
      "#d21f5b",
      "#ff2b86",
      "#b64b4b",
      "#f59e0b",
      "#10b981",
      "#3b82f6",
      "#8b5cf6",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const addNewShade = () => {
    setShades([...shades, { ...initialShade, shadeColor: getRandomColor() }]);
  };

  const removeShade = (index) => {
    setShades(shades.filter((_, i) => i !== index));

    setShadePreviews((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  const handleShadeChange = (index, field, value) => {
    const updatedShades = [...shades];
    updatedShades[index] = {
      ...updatedShades[index],
      [field]: value,
    };
    setShades(updatedShades);
  };

  const handleShadeImageChange = (index, field, file) => {
    if (!file) return;

    const updatedShades = [...shades];
    updatedShades[index] = {
      ...updatedShades[index],
      [field]: file,
    };
    setShades(updatedShades);

    setShadePreviews((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: URL.createObjectURL(file),
      },
    }));
  };

  const handleFileChange = (e, imgKey) => {
    const file = e.target.files[0];

    if (file) {
      setProduct({ ...product, [imgKey]: file });
      setImagePreviews({
        ...imagePreviews,
        [imgKey]: URL.createObjectURL(file),
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!product.prod_name.trim()) {
      newErrors.prod_name = "Product name is required";
    } else if (product.prod_name.length > 100) {
      newErrors.prod_name = "Product name must be less than 100 characters";
    }

    if (!product.prod_category.trim()) {
      newErrors.prod_category = "Category is required";
    }

    if (!product.prod_quantity || product.prod_quantity < 0) {
      newErrors.prod_quantity = "Valid quantity is required";
    }

    if (!product.prod_price || product.prod_price < 0) {
      newErrors.prod_price = "Valid price is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = () => {
    setProduct({
      prod_name: "",
      prod_category: "",
      prod_subcategory: "",
      skin_concern: "",
      ingredients: "",
      skin_type: "",
      prod_quantity: "",
      prod_price: "",
      prod_img1: null,
      prod_img2: null,
      prod_img3: null,
      prod_img4: null,
      prod_description: "",
    });

    setHasShade(false);
    setShades([{ ...initialShade }]);
    setShadePreviews({});

    setImagePreviews({
      prod_img1: null,
      prod_img2: null,
      prod_img3: null,
      prod_img4: null,
    });

    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const formData = new FormData();

    formData.append("prod_name", product.prod_name);
    formData.append("prod_category", product.prod_category);
    formData.append("prod_quantity", product.prod_quantity);
    formData.append("prod_price", product.prod_price);
    formData.append("prod_description", product.prod_description || "");
    formData.append("hasShade", hasShade);
    formData.append("prod_subcategory", product.prod_subcategory || "");
    formData.append("skin_concern", product.skin_concern || "");
    formData.append("ingredients", product.ingredients || "");
    formData.append("skin_type", product.skin_type || "");

    if (product.prod_img1) formData.append("prod_img1", product.prod_img1);
    if (product.prod_img2) formData.append("prod_img2", product.prod_img2);
    if (product.prod_img3) formData.append("prod_img3", product.prod_img3);
    if (product.prod_img4) formData.append("prod_img4", product.prod_img4);

    try {
      const response = await axios.post(
        "http://localhost:8080/addProduct",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      const savedProduct = response.data;

      if (hasShade) {
        for (const shade of shades) {
          if (!shade.shadeName && !shade.shadeColor) continue;

          const shadeFormData = new FormData();

          shadeFormData.append("productId", savedProduct.prod_id);
          shadeFormData.append("shade_name", shade.shadeName || "");
          shadeFormData.append("shade_color", shade.shadeColor || "#e60023");
          shadeFormData.append("stock", product.prod_quantity || 0);

          if (shade.shadeImage1) {
            shadeFormData.append("shade_image1", shade.shadeImage1);
          }

          if (shade.shadeImage2) {
            shadeFormData.append("shade_image2", shade.shadeImage2);
          }

          if (shade.shadeImage3) {
            shadeFormData.append("shade_image3", shade.shadeImage3);
          }

          await axios.post("http://localhost:8080/addShade", shadeFormData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        }
      }

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        handleReset();
      }, 2000);
    } catch (error) {
      console.error("Error adding product:", error);
      setErrors({ submit: "Failed to add product. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatIndianPrice = (price) => {
    if (!price) return "0.00";
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <>
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="success-icon">✅</div>
            <h2 className="success-title">Success!</h2>
            <p className="success-message">
              Product has been added successfully to your inventory.
            </p>
          </div>
        </div>
      )}

      <div className="creative-form-container">
        <div className="creative-form-wrapper">
          <div className="creative-header">
            <div>
              <h1 className="creative-title">
                <span className="title-icon">📦</span>
                Create New Product
              </h1>
              <p className="creative-subtitle">
                Add a new product to your inventory with image files
              </p>
            </div>
          </div>

          <div className="creative-main-content">
            <div className="creative-form-section">
              <h2 className="section-title">
                <span className="section-icon">✏️</span>
                Product Details
              </h2>

              {errors.submit && (
                <div className="creative-error">{errors.submit}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="creative-form-group">
                  <label className="creative-form-label">Product Name</label>
                  <input
                    type="text"
                    className={`creative-input ${errors.prod_name ? "error" : ""}`}
                    name="prod_name"
                    value={product.prod_name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                  />
                  {errors.prod_name && (
                    <div className="creative-error">{errors.prod_name}</div>
                  )}
                </div>

                <div className="creative-form-group">
                  <label className="creative-form-label">Category</label>
                  <select
                    className={`creative-input ${errors.prod_category ? "error" : ""}`}
                    name="prod_category"
                    value={product.prod_category}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.prod_category && (
                    <div className="creative-error">{errors.prod_category}</div>
                  )}
                </div>

                <div className="creative-form-group">
                  <label className="creative-form-label">Description</label>
                  <textarea
                    className="creative-input"
                    name="prod_description"
                    value={product.prod_description}
                    onChange={handleChange}
                    placeholder="Enter product description"
                    rows="3"
                  />
                </div>
                <div className="creative-form-group">
                  <label className="creative-form-label">Subcategory</label>
                  <select
                    className="creative-input"
                    name="prod_subcategory"
                    value={product.prod_subcategory}
                    onChange={handleChange}
                  >
                    <option value="">Select Subcategory</option>
                    <option value="Moisturizer">Moisturizer</option>
                    <option value="Sunscreen">Sunscreen</option>
                    <option value="Face Serums">Face Serums</option>
                    <option value="Face Wash">Face Wash</option>
                    <option value="Lip Care">Lip Care</option>
                    <option value="Face Mask">Face Mask</option>
                    <option value="Eye Care">Eye Care</option>
                    <option value="Face Toners">Face Toners</option>
                    <option value="Body Care">Body Care</option>
                    <option value="Hair Care">Hair Care</option>
                    <option value="Night Care">Night Care</option>
                    <option value="Combos">Combos</option>
                  </select>
                </div>

                <div className="creative-form-group">
                  <label className="creative-form-label">Skin Concern</label>

                  {[
                    "Acne",
                    "Pigmentation",
                    "Dryness",
                    "Dullness",
                    "Dark Spots",
                    "Damaged Skin Barrier",
                    "Excess Oil",
                    "Ageing",
                  ].map((concern) => {
                    const selectedSkinConcerns = product.skin_concern
                      ? product.skin_concern.split(",")
                      : [];

                    return (
                      <label
                        key={concern}
                        style={{ display: "block", marginBottom: "8px" }}
                      >
                        <input
                          type="checkbox"
                          value={concern}
                          checked={selectedSkinConcerns.includes(concern)}
                          onChange={(e) => {
                            const updated = e.target.checked
                              ? [...selectedSkinConcerns, concern]
                              : selectedSkinConcerns.filter(
                                  (item) => item !== concern,
                                );

                            setProduct({
                              ...product,
                              skin_concern: updated.join(","),
                            });
                          }}
                        />{" "}
                        {concern}
                      </label>
                    );
                  })}
                </div>

                <div className="creative-form-group">
                  <label className="creative-form-label">Ingredients</label>
                  <select
                    className="creative-input"
                    name="ingredients"
                    value={product.ingredients}
                    onChange={handleChange}
                  >
                    <option value="">Select Ingredient</option>
                    <option value="Vitamin C">Vitamin C</option>
                    <option value="Hyaluronic + Ceramides">
                      Hyaluronic + Ceramides
                    </option>
                    <option value="Niacinamide + CICA">
                      Niacinamide + CICA
                    </option>
                    <option value="Watermelon + AHA">Watermelon + AHA</option>
                    <option value="Strawberry">Strawberry</option>
                    <option value="Salicylic Acid">Salicylic Acid</option>
                    <option value="Pomegranate + Retinol">
                      Pomegranate + Retinol
                    </option>
                    <option value="Mango">Mango</option>
                    <option value="Dragon Fruit">Dragon Fruit</option>
                  </select>
                </div>

                <div className="creative-form-group">
                  <label className="creative-form-label">Skin Type</label>

                  {["Oily", "Dry", "Combination", "Sensitive", "Normal"].map(
                    (type) => {
                      const selectedSkinTypes = product.skin_type
                        ? product.skin_type.split(",")
                        : [];

                      return (
                        <label
                          key={type}
                          style={{ display: "block", marginBottom: "8px" }}
                        >
                          <input
                            type="checkbox"
                            value={type}
                            checked={selectedSkinTypes.includes(type)}
                            onChange={(e) => {
                              const updated = e.target.checked
                                ? [...selectedSkinTypes, type]
                                : selectedSkinTypes.filter(
                                    (item) => item !== type,
                                  );

                              setProduct({
                                ...product,
                                skin_type: updated.join(","),
                              });
                            }}
                          />{" "}
                          {type}
                        </label>
                      );
                    },
                  )}
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "15px",
                  }}
                >
                  <div className="creative-form-group">
                    <label className="creative-form-label">Quantity</label>
                    <input
                      type="number"
                      className={`creative-input ${errors.prod_quantity ? "error" : ""}`}
                      name="prod_quantity"
                      value={product.prod_quantity}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                    />
                    {errors.prod_quantity && (
                      <div className="creative-error">
                        {errors.prod_quantity}
                      </div>
                    )}
                  </div>

                  <div className="creative-form-group">
                    <label className="creative-form-label">Price (₹)</label>
                    <input
                      type="number"
                      step="0.01"
                      className={`creative-input ${errors.prod_price ? "error" : ""}`}
                      name="prod_price"
                      value={product.prod_price}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                    />
                    {errors.prod_price && (
                      <div className="creative-error">{errors.prod_price}</div>
                    )}
                  </div>
                </div>

                <div className="creative-form-group">
                  <button
                    type="button"
                    className={`shade-toggle-btn ${hasShade ? "active" : ""}`}
                    onClick={() => setHasShade(!hasShade)}
                  >
                    {hasShade
                      ? "Remove Shades"
                      : "Add Shades (For Lip Balm/Variants)"}
                  </button>
                </div>

                {hasShade && (
                  <div className="shade-section">
                    <h3 className="upload-title">Product Shades</h3>

                    {shades.map((shade, index) => (
                      <div key={index} className="shade-box">
                        <div className="shade-header">
                          <h4>Shade {index + 1}</h4>
                          {shades.length > 1 && (
                            <button
                              type="button"
                              className="remove-shade-btn"
                              onClick={() => removeShade(index)}
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        <input
                          type="text"
                          className="creative-input"
                          placeholder="Shade name (e.g., Strawberry Glaze)"
                          value={shade.shadeName}
                          onChange={(e) =>
                            handleShadeChange(
                              index,
                              "shadeName",
                              e.target.value,
                            )
                          }
                        />

                        <div className="shade-color-row">
                          <span>Shade Color: </span>
                          <input
                            type="color"
                            className="shade-color-picker"
                            value={shade.shadeColor}
                            onChange={(e) =>
                              handleShadeChange(
                                index,
                                "shadeColor",
                                e.target.value,
                              )
                            }
                          />
                          <span className="shade-color-value">
                            {shade.shadeColor}
                          </span>
                        </div>

                        <div className="shade-image-grid">
                          {[1, 2, 3].map((num) => {
                            const field = `shadeImage${num}`;
                            const preview = shadePreviews[index]?.[field];

                            return (
                              <div key={num} className="shade-image-input">
                                <label>Image {num}</label>

                                {preview && (
                                  <div className="image-preview">
                                    <img
                                      src={preview}
                                      alt={`Shade ${index + 1} image ${num}`}
                                      className="preview-thumbnail"
                                    />
                                  </div>
                                )}

                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleShadeImageChange(
                                      index,
                                      field,
                                      e.target.files[0],
                                    )
                                  }
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="add-shade-btn"
                      onClick={addNewShade}
                    >
                      Add Another Shade
                    </button>
                  </div>
                )}

                <div className="image-url-section">
                  <h3 className="upload-title">
                    Product Images (Main Product - 4 images max)
                  </h3>
                  <div className="url-grid">
                    {[1, 2, 3, 4].map((num) => (
                      <div key={num} className="url-input-group">
                        <div className="url-number">{num}</div>
                        <input
                          type="file"
                          className="creative-input"
                          onChange={(e) =>
                            handleFileChange(e, `prod_img${num}`)
                          }
                          accept="image/*"
                        />

                        {imagePreviews[`prod_img${num}`] && (
                          <div className="image-preview">
                            <img
                              src={imagePreviews[`prod_img${num}`]}
                              alt="Preview"
                              className="preview-thumbnail"
                            />
                            <button
                              type="button"
                              className="remove-image"
                              onClick={() => {
                                setProduct({
                                  ...product,
                                  [`prod_img${num}`]: null,
                                });
                                setImagePreviews({
                                  ...imagePreviews,
                                  [`prod_img${num}`]: null,
                                });
                              }}
                            >
                              ❌
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="creative-button-group">
                  <button
                    type="button"
                    className="creative-btn btn-reset"
                    onClick={handleReset}
                    disabled={isSubmitting}
                  >
                     Clear All
                  </button>
                  <button
                    type="submit"
                    className="creative-btn btn-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <> Adding...</> : <>Add Product</>}
                  </button>
                </div>
              </form>
            </div>

            <div className="creative-preview-section">
              <div className="preview-header">
                <h2 className="preview-title">Product Preview</h2>
              </div>

              <div className="preview-card">
                <div className="preview-product-name">
                  {product.prod_name || "Product Name"}
                </div>

                <div className="preview-category">{product.prod_category}</div>

                <div className="preview-details">
                  <div className="preview-detail">
                    <div className="detail-label">Quantity</div>
                    <div className="detail-value">
                      {product.prod_quantity
                        ? `${product.prod_quantity} units`
                        : "-"}
                    </div>
                  </div>

                  <div className="preview-detail">
                    <div className="detail-label">Price</div>
                    <div className="detail-value">
                      {product.prod_price
                        ? `₹${formatIndianPrice(product.prod_price)}`
                        : "-"}
                    </div>
                  </div>

                  <div className="preview-detail">
                    <div className="detail-label">Status</div>
                    <div
                      className="detail-value"
                      style={{
                        color:
                          product.prod_quantity > 0 ? "#27ae60" : "#e74c3c",
                      }}
                    >
                      {product.prod_quantity > 0
                        ? "✅ In Stock"
                        : "❌ Out of Stock"}
                    </div>
                  </div>
                </div>

                {hasShade &&
                  shades.length > 0 &&
                  shades.some((s) => s.shadeName) && (
                    <div className="preview-shade-section">
                      <h4 className="preview-images-title">Available Shades</h4>
                      <div className="preview-shade-list">
                        {shades.map(
                          (shade, index) =>
                            shade.shadeName && (
                              <div key={index} className="preview-shade-item">
                                <span
                                  className="preview-shade-dot"
                                  style={{ backgroundColor: shade.shadeColor }}
                                ></span>
                                <span>{shade.shadeName}</span>
                              </div>
                            ),
                        )}
                      </div>
                    </div>
                  )}

                {product.prod_description && (
                  <div
                    style={{
                      marginTop: "15px",
                      paddingTop: "15px",
                      borderTop: "1px solid #ecf0f1",
                    }}
                  >
                    <div className="detail-label">Description</div>
                    <p
                      style={{
                        color: "#7f8c8d",
                        fontSize: "0.85rem",
                        marginTop: "8px",
                      }}
                    >
                      {product.prod_description}
                    </p>
                  </div>
                )}

                <div className="preview-images">
                  <h4 className="preview-images-title">
                    Product Images (
                    {
                      [1, 2, 3, 4].filter(
                        (num) => imagePreviews[`prod_img${num}`],
                      ).length
                    }
                    /4)
                  </h4>

                  <div className="preview-image-grid">
                    {[1, 2, 3, 4].map((num) => (
                      <div
                        key={num}
                        className={`preview-image-box ${imagePreviews[`prod_img${num}`] ? "has-image" : ""}`}
                      >
                        {imagePreviews[`prod_img${num}`] ? (
                          <img
                            src={imagePreviews[`prod_img${num}`]}
                            alt="Preview"
                            className="preview-image-thumb"
                          />
                        ) : (
                          <div className="preview-image-placeholder">
                            No image
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
