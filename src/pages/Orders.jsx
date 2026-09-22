import { useEffect, useState } from "react";
import { getOrders } from "../api/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    getOrders(token)
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

  if (!token) {
    return (
      <div className="orders-page">
        <div className="orders-message">
          <h2>Please login to view your orders.</h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-message">
          <h2>Loading orders...</h2>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <div className="orders-header">
          <h1>My Orders</h1>
          <p>Track your SizeByte purchases</p>
        </div>

        <div className="orders-message">
          <h2>No orders found.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      {/* Page Header */}
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track your SizeByte purchases</p>
      </div>

      {/* Orders */}
      <div className="orders-grid">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            {/* Order Header */}
            <div className="order-header">
              <h2>Order #{order.id}</h2>

              <span className={`order-status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>

            {/* Order Items */}
            <div className="order-items">
              {order.orderItems.map((item) => (
                <div className="order-item" key={item.id}>
                  <img src={item.product.imageUrl} alt={item.product.name} />

                  <div className="order-item-details">
                    <h3>{item.product.name}</h3>

                    <p>
                      Quantity: <strong>{item.quantity}</strong>
                    </p>

                    <p>Price: ₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Footer */}
            <div className="order-footer">
              <span>Total</span>
              <strong>₹{order.totalAmount}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
