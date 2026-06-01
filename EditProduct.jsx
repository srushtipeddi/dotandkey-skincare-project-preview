import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import baseUrl from "../../../BaseUrl/BaseUel";

const newShade = {
  shade_id: null,
  shadeName: "",
  shadeColor: "#e60023",
  shadeImage1: null,
  shadeImage2: null,
  shadeImage3: null,
  existingShadeImage1: "",
  existingShadeImage2: "",
  existingShadeImage3: "",
};

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    prod_id: "",
    prod_name: "",
    prod_category: "",
    prod_subcategory: "",
    skin_concern: "",
    ingredients: "",
    skin_type: "",
    prod_quantity: "",
    prod_price: "",
    prod_description: "",
    prod_img1: null,
    prod_img2: null,
    prod_img3: null,
    prod_img4: null,
  });
  const [hasShade, setHasShade] = useState(false);
  const [shades, setShades] = useState([{ ...newShade }]);
  const [deletedShadeIds, setDeletedShadeIds] = useState([]);
  const [shadePreviews, setShadePreviews] = useState({});
  const [existingImages, setExistingImages] = useState({});
  const [imagePreviews, setImagePreviews] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
  const categoryIcons = {
    ELECTRONICS: "📱",
    CLOTHING: "👕",
    BOOKS: "📚",
    HOME: "🏠",
    SPORTS: "⚽",
    BEAUTY: "💄",
    GROCERY: "🛒",
    OTHER: "📦",
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    const filename = imagePath.split("/").pop().split("\\").pop();
    return `${baseUrl}/images/${filename}`;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const productRes = await axios.get(
          `${baseUrl}/getProductById?id=${id}`,
        );
        const data = productRes.data;
        setProduct({
          prod_id: data.prod_id || "",
          prod_name: data.prod_name || "",
          prod_category: data.prod_category || "",
          prod_subcategory: data.prod_subcategory || "",
          skin_concern: data.skin_concern || "",
          ingredients: data.ingredients || "",
          skin_type: data.skin_type || "",
          prod_quantity: data.prod_quantity || "",
          prod_price: data.prod_price || "",
          prod_description: data.prod_description || "",
          prod_img1: null,
          prod_img2: null,
          prod_img3: null,
          prod_img4: null,
        });

        setExistingImages({
          prod_img1: data.prod_img1 || "",
          prod_img2: data.prod_img2 || "",
          prod_img3: data.prod_img3 || "",
          prod_img4: data.prod_img4 || "",
        });

        setHasShade(Boolean(data.hasShade));

        const shadeRes = await axios.get(`${baseUrl}/getShadesByProduct/${id}`);
        const dbShades = shadeRes.data || [];

        if (dbShades.length > 0) {
          setShades(
            dbShades.map((s) => ({
              shade_id: s.shade_id,
              shadeName: s.shade_name || "",
              shadeColor: s.shade_color || "#e60023",
              shadeImage1: null,
              shadeImage2: null,
              shadeImage3: null,
              existingShadeImage1: s.shade_image1 || "",
              existingShadeImage2: s.shade_image2 || "",
              existingShadeImage3: s.shade_image3 || "",
            })),
          );
        } else {
          setShades([{ ...newShade }]);
        }
      } catch (error) {
        console.error(error);
        alert("Server error");
      }
    };

    loadData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleShadeChange = (index, field, value) => {
    const updated = [...shades];
    updated[index] = { ...updated[index], [field]: value };
    setShades(updated);
  };

  const handleShadeImageChange = (index, field, file) => {
    if (!file) return;

    const updated = [...shades];
    updated[index] = { ...updated[index], [field]: file };
    setShades(updated);

    setShadePreviews((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: URL.createObjectURL(file),
      },
    }));
  };

  const addShade = () => {
    setShades([...shades, { ...newShade }]);
  };

  const removeShade = (index) => {
    const shade = shades[index];

    if (shade.shade_id) {
      setDeletedShadeIds((prev) => [...prev, shade.shade_id]);
    }

    const updated = shades.filter((_, i) => i !== index);
    setShades(updated.length > 0 ? updated : [{ ...newShade }]);
  };

  const handleFileChange = (e, imgKey) => {
    const file = e.target.files[0];

    if (file) {
      setProduct((prev) => ({ ...prev, [imgKey]: file }));
      setImagePreviews((prev) => ({
        ...prev,
        [imgKey]: URL.createObjectURL(file),
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!product.prod_name.trim())
      newErrors.prod_name = "Product name is required";
    if (!product.prod_category.trim())
      newErrors.prod_category = "Category is required";
    if (!product.prod_quantity || product.prod_quantity < 0)
      newErrors.prod_quantity = "Valid quantity is required";
    if (!product.prod_price || product.prod_price < 0)
      newErrors.prod_price = "Valid price is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveShade = async (shade) => {
    const shadeFormData = new FormData();

    shadeFormData.append("productId", product.prod_id);
    shadeFormData.append("shade_name", shade.shadeName || "");
    shadeFormData.append("shade_color", shade.shadeColor || "#e60023");
    shadeFormData.append("stock", product.prod_quantity || 0);

    if (shade.shadeImage1)
      shadeFormData.append("shade_image1", shade.shadeImage1);
    if (shade.shadeImage2)
      shadeFormData.append("shade_image2", shade.shadeImage2);
    if (shade.shadeImage3)
      shadeFormData.append("shade_image3", shade.shadeImage3);

    if (shade.shade_id) {
      await axios.put(
        `${baseUrl}/updateShade/${shade.shade_id}`,
        shadeFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
    } else {
      await axios.post(`${baseUrl}/addShade`, shadeFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const formData = new FormData();

    formData.append("prod_id", product.prod_id);
    formData.append("prod_name", product.prod_name);
    formData.append("prod_category", product.prod_category);
    formData.append("prod_subcategory", product.prod_subcategory || "");
    formData.append("skin_concern", product.skin_concern || "");
    formData.append("ingredients", product.ingredients || "");
    formData.append("skin_type", product.skin_type || "");
    formData.append("prod_quantity", product.prod_quantity);
    formData.append("prod_price", product.prod_price);
    formData.append("prod_description", product.prod_description || "");
    formData.append("hasShade", hasShade);

    if (product.prod_img1) formData.append("prod_img1", product.prod_img1);
    if (product.prod_img2) formData.append("prod_img2", product.prod_img2);
    if (product.prod_img3) formData.append("prod_img3", product.prod_img3);
    if (product.prod_img4) formData.append("prod_img4", product.prod_img4);

    try {
      await axios.put(`${baseUrl}/updateById`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      for (const shadeId of deletedShadeIds) {
        await axios.delete(`${baseUrl}/deleteShade/${shadeId}`);
      }

      if (hasShade) {
        for (const shade of shades) {
          if (!shade.shadeName.trim() && !shade.shadeColor) continue;
          await saveShade(shade);
        }
      }

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        navigate("/show-product", {
          state: { productUpdated: true, timestamp: Date.now() },
        });
      }, 1500);
    } catch (error) {
      console.error("UPDATE ERROR:", error.response || error);
      alert(error.response?.data?.message || "Update failed! Check console");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="success-icon">✅</div>
            <h2 className="success-title">Success!</h2>
            <p className="success-message">
              Product has been updated successfully.
            </p>
          </div>
        </div>
      )}

      <div className="creative-form-container">
        <div className="creative-form-wrapper">
          <div className="creative-header">
            <div>
              <h1 className="creative-title">
                <span className="title-icon">✏️</span>Update Product Details
              </h1>
              <p className="creative-subtitle">
                Modify product information and shades
              </p>
            </div>
          </div>

          <div className="creative-main-content">
            <div className="creative-form-section">
              <h2 className="section-title">
                <span className="section-icon">🔄</span>Edit Product Information
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="creative-form-group">
                  <label className="creative-form-label">Product ID</label>
                  <input
                    className="creative-input"
                    name="prod_id"
                    value={product.prod_id}
                    readOnly
                  />
                </div>

                <div className="creative-form-group">
                  <label className="creative-form-label">Product Name</label>
                  <input
                    className={`creative-input ${errors.prod_name ? "error" : ""}`}
                    name="prod_name"
                    value={product.prod_name}
                    onChange={handleChange}
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
                        {categoryIcons[category]} {category}
                      </option>
                    ))}
                  </select>
                  {errors.prod_category && (
                    <div className="creative-error">{errors.prod_category}</div>
                  )}
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

                <div className="creative-form-group">
                  <label className="creative-form-label">Description</label>
                  <textarea
                    className="creative-input"
                    name="prod_description"
                    value={product.prod_description}
                    onChange={handleChange}
                    rows="3"
                  />
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
                      min="0"
                    />
                    {errors.prod_quantity && (
                      <div className="creative-error">
                        {errors.prod_quantity}
                      </div>
                    )}
                  </div>

                  <div className="creative-form-group">
                    <label className="creative-form-label">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      className={`creative-input ${errors.prod_price ? "error" : ""}`}
                      name="prod_price"
                      value={product.prod_price}
                      onChange={handleChange}
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
                    {hasShade ? "❌ Remove Shades" : "🎨 Add Shades"}
                  </button>
                </div>

                {hasShade && (
                  <div className="shade-section">
                    <h3 className="upload-title">Product Shades</h3>

                    {shades.map((shade, index) => (
                      <div key={index} className="shade-box">
                        <div className="shade-header">
                          <h4>Shade {index + 1}</h4>
                          <button
                            type="button"
                            className="remove-shade-btn"
                            onClick={() => removeShade(index)}
                          >
                            ❌ Remove
                          </button>
                        </div>

                        <input
                          type="text"
                          className="creative-input"
                          placeholder="Shade name"
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
                          <span>Shade Color:</span>
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
                            const existingField = `existingShadeImage${num}`;
                            const previewImage = shadePreviews[index]?.[field];
                            const existingImage = shade[existingField];
                            const imageToShow =
                              previewImage ||
                              (existingImage ? getImageUrl(existingImage) : "");

                            return (
                              <div key={num} className="shade-image-box">
                                <label className="shade-image-label">
                                  Image {num}
                                </label>

                                {imageToShow && (
                                  <div className="shade-image-preview">
                                    <img
                                      src={imageToShow}
                                      alt={`Shade ${index + 1} image ${num}`}
                                      className="shade-preview-img"
                                    />
                                    <span
                                      className={
                                        previewImage
                                          ? "new-label"
                                          : "current-label"
                                      }
                                    >
                                      {previewImage
                                        ? "New Image"
                                        : "Current Image"}
                                    </span>
                                  </div>
                                )}

                                <input
                                  type="file"
                                  className="shade-file-input"
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
                      onClick={addShade}
                    >
                      ➕ Add Another Shade
                    </button>
                  </div>
                )}

                <div className="image-url-section">
                  <h3 className="upload-title">Update Product Images</h3>

                  <div className="url-grid">
                    {[1, 2, 3, 4].map((num) => {
                      const newPreview = imagePreviews[`prod_img${num}`];
                      const existing = existingImages[`prod_img${num}`];
                      const imageToShow = newPreview || getImageUrl(existing);

                      return (
                        <div key={num} className="url-input-group">
                          <div className="url-number">{num}</div>

                          {imageToShow && (
                            <div className="existing-image-preview">
                              <img
                                src={imageToShow}
                                alt={`Product ${num}`}
                                className="current-image-thumb"
                              />
                              <span
                                className={
                                  newPreview ? "new-label" : "current-label"
                                }
                              >
                                {newPreview ? "New Image" : "Current Image"}
                              </span>
                            </div>
                          )}

                          <input
                            type="file"
                            className="creative-input url-input"
                            onChange={(e) =>
                              handleFileChange(e, `prod_img${num}`)
                            }
                            accept="image/*"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="creative-button-group">
                  <button
                    type="button"
                    className="creative-btn btn-reset"
                    disabled={isSubmitting}
                    onClick={() => navigate("/show-product")}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="creative-btn btn-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "💾 Update Product"}
                  </button>
                </div>
              </form>
            </div>

            <div className="creative-preview-section">
              <div className="preview-card">
                <div className="preview-product-name">
                  {product.prod_name || "Product Name"}
                </div>
                <div className="preview-category">{product.prod_category}</div>

                {hasShade && shades.some((s) => s.shadeName) && (
                  <div className="preview-shade-section">
                    <h4 className="preview-images-title">Product Shades</h4>
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

                <div className="preview-details">
                  <div className="preview-detail">
                    <div className="detail-label">Quantity</div>
                    <div className="detail-value">{product.prod_quantity}</div>
                  </div>
                  <div className="preview-detail">
                    <div className="detail-label">Price</div>
                    <div className="detail-value">₹{product.prod_price}</div>
                  </div>
                  <div className="preview-detail">
                    <div className="detail-label">Category</div>
                    <div className="detail-value">{product.prod_category}</div>
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

export default EditProduct;
