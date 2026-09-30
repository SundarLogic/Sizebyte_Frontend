const API_URL = import.meta.env.VITE_API_URL || "https://sizebyte.vercel.app";

const request = async (path, { method = "GET", token, body } = {}) => {
  const isFormData = body instanceof FormData;

  const headers = {};
  if (body && !isFormData) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method: method,
    headers: headers,
    body: body && !isFormData ? JSON.stringify(body) : body,
  });

  //Error pages from the server may not be JSON
  const text = await response.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text };
  }

  if (!response.ok) {
    //Expired or invalid token: log out and send the user to login
    if (response.status === 401 && token) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminId");
      window.location.href = "/login";
    }

    const message =
      data.errors?.[0]?.msg || data.message || `Request failed (${response.status})`;
    throw new Error(message);
  }

  return data;
};

export const userSignup = (name, email, password) => {
  return request("/user/signup", {
    method: "POST",
    body: { name, email, password },
  });
};

export const adminSignup = (name, email, password) => {
  return request("/admin/signup", {
    method: "POST",
    body: { name, email, password },
  });
};

export const userLogin = (email, password) => {
  return request("/user/login", {
    method: "POST",
    body: { email, password },
  });
};

export const adminLogin = (email, password) => {
  return request("/admin/login", {
    method: "POST",
    body: { email, password },
  });
};

export const getProducts = ({
  page = 1,
  limit = 6,
  search = "",
  category = "",
  minPrice = "",
  maxPrice = "",
  sort = "createdAt",
  order = "asc",
} = {}) => {
  const filters = { page, limit, search, category, minPrice, maxPrice, sort, order };

  //Only send filters that have a value
  const params = new URLSearchParams(
    Object.entries(filters).filter(([, value]) => value !== ""),
  );

  return request(`/products?${params}`);
};

export const addProduct = (productData, token) => {
  return request("/products", {
    method: "POST",
    token,
    body: productData,
  });
};

export const updateProduct = (productId, productData, token) => {
  return request(`/products/${productId}`, {
    method: "PUT",
    token,
    body: productData,
  });
};

export const deleteProduct = (productId, token) => {
  return request(`/products/${productId}`, {
    method: "DELETE",
    token,
  });
};

export const getAdminProducts = (token) => {
  return request("/admin/products", { token });
};

export const addToCart = (productId, quantity, token) => {
  return request("/cart", {
    method: "POST",
    token,
    body: { productId, quantity },
  });
};

export const getCart = (token) => {
  return request("/cart", { token });
};

export const updateCart = (productId, quantity, token) => {
  return request("/cart", {
    method: "PUT",
    token,
    body: { productId, quantity },
  });
};

export const deleteCartItem = (productId, token) => {
  return request("/cart", {
    method: "DELETE",
    token,
    body: { productId },
  });
};

export const checkout = (token) => {
  return request("/checkout", {
    method: "POST",
    token,
  });
};

export const getOrders = (token) => {
  return request("/orders", { token });
};

export const getAdminOrders = (token) => {
  return request("/admin/orders", { token });
};

export const updateOrderStatus = (orderId, status, token) => {
  return request(`/admin/order/${orderId}`, {
    method: "PUT",
    token,
    body: { status },
  });
};
