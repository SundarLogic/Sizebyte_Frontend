import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts, updateProduct } from "../api/api";

function EditProduct() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    getProducts()
      .then((data) => {
        const product = data.products.find(
          (product) => product.id === Number(id),
        );

        if (product) {
          setName(product.name);
          setCategory(product.category);
          setDescription(product.description);
          setPrice(product.price);
          setQuantity(product.quantity);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("adminToken");

    const formData = new FormData();

    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);

    if (image) {
      formData.append("image", image);
    }

    updateProduct(id, formData, token)
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="edit-product-page">
      <div className="edit-product-card">
        <h1>Edit Product</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Mouse">Mouse</option>
              <option value="Keyboard">Keyboard</option>
              <option value="Headphones">Headphones</option>
              <option value="Monitor">Monitor</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>New Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setImage(event.target.files[0])}
            />
          </div>

          <button className="edit-product-submit" type="submit">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
