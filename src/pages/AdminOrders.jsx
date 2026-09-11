import { useEffect, useState } from "react";
import { getAdminOrders, updateOrderStatus } from "../api/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    getAdminOrders(token)
      .then((data) => {
        setOrders(data.orders || []);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const handleStatusChange = (orderId, status) => {
    updateOrderStatus(orderId, status, token)
      .then((data) => {
        alert(data.message);

        setOrders((currentOrders) =>
          currentOrders.map((order) =>
            order.orderId === orderId ? { ...order, status: status } : order,
          ),
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  if (loading) {
    return <h2>Loading orders...</h2>;
  }

  if (orders.length === 0) {
    return <h2>No orders found.</h2>;
  }

  return (
    <div>
      <h1>Admin Orders</h1>

      {orders.map((order, index) => (
        <div key={`${order.orderId}-${order.productId}-${index}`}>
          <h2>Order #{order.orderId}</h2>

          <p>User ID: {order.userId}</p>
          <p>Product: {order.product.name}</p>
          <p>Quantity: {order.quantity}</p>
          <p>Price: ₹{order.price}</p>
          <p>Total: ₹{order.totalAmount}</p>
          <p>Status: {order.status}</p>

          <button onClick={() => handleStatusChange(order.orderId, "SHIPPED")}>
            Shipped
          </button>

          <button
            onClick={() => handleStatusChange(order.orderId, "DELIVERED")}
          >
            Delivered
          </button>

          <button
            onClick={() => handleStatusChange(order.orderId, "CANCELLED")}
          >
            Cancelled
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;
