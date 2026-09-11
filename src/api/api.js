const API_URL = "https://sizebyte.vercel.app";

export const userSignup = async (name, email, password, address) => {
  const response = await fetch(`${API_URL}/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      address: address,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
};

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const addToCart = async (productId, quantity, token) => {
  const response = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId: productId,
      quantity: quantity,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Failed to add product to cart");
  }

  return response.json();
};

export const getCart = async (token) => {
  const response = await fetch(`${API_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Failed to fetch cart");
  }

  return response.json();
};

export const updateCart = async (productId, quantity, token) => {
  const response = await fetch(`${API_URL}/cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId: productId,
      quantity: quantity,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Failed to update cart");
  }

  return response.json();
};

export const deleteCartItem = async (productId, token) => {
  const response = await fetch(`${API_URL}/cart`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId: productId,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Failed to remove product");
  }

  return response.json();
};

export const checkout = async (token) => {
  const response = await fetch(`${API_URL}/checkout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Checkout failed");
  }

  return data;
};

export const getOrders = async (token) => {
  const response = await fetch(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch orders");
  }

  return data;
};

export const updateProduct = async (productId, productData, token) => {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: productData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update product");
  }

  return data;
};

export const deleteProduct = async (productId, token) => {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete product");
  }

  return data;
};

export const getAdminOrders = async (token) => {
  const response = await fetch(`${API_URL}/admin/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch admin orders");
  }

  return data;
};

export const updateOrderStatus = async (orderId, status, token) => {
  const response = await fetch(`${API_URL}/admin/order/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      status: status,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update order status");
  }

  return data;
};

export const getAdminProducts = async (token) => {
  const response = await fetch(`${API_URL}/admin/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch admin products");
  }

  return data;
};
