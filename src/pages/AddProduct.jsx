import { useState } from "react";

const API_URL = "https://sizebyte.vercel.app";

function AddProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("adminToken");

    const formData = new FormData();

    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("image", image);

    fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.product) {
          alert("Product added successfully");

          setName("");
          setCategory("");
          setDescription("");
          setPrice("");
          setQuantity("");
          setImage(null);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Something went wrong");
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Add Product</h1>

        <p className="auth-subtitle">
          Add a new product to your SizeByte store
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              placeholder="Enter product name"
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
              placeholder="Enter product description"
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              value={price}
              placeholder="Enter price"
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              placeholder="Enter stock quantity"
              onChange={(event) => setQuantity(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setImage(event.target.files[0])}
            />
          </div>

          <button type="submit" className="auth-submit">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
