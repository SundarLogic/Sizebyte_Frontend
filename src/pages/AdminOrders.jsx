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
    return <h2 className="page-message">Loading orders...</h2>;
  }

  if (orders.length === 0) {
    return <h2 className="page-message">No orders found.</h2>;
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Seller Orders</h1>
        <p>View and manage customer orders</p>
      </div>

      <div className="admin-orders">
        {orders.map((order, index) => (
          <div
            className="admin-order-card"
            key={`${order.orderId}-${order.productId}-${index}`}
          >
            <div className="order-header">
              <h2>Order #{order.orderId}</h2>

              <span className={`order-status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>

            <div className="order-details">
              <p>
                <strong>Customer ID:</strong> {order.userId}
              </p>

              <p>
                <strong>Product:</strong> {order.product.name}
              </p>

              <p>
                <strong>Quantity:</strong> {order.quantity}
              </p>

              <p>
                <strong>Price:</strong> ₹{order.price}
              </p>

              <p>
                <strong>Total:</strong> ₹{order.totalAmount}
              </p>
            </div>

            <div className="order-actions">
              <button
                onClick={() => handleStatusChange(order.orderId, "SHIPPED")}
              >
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;
