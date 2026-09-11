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
    return <h2>Please login to view your orders.</h2>;
  }

  if (loading) {
    return <h2>Loading orders...</h2>;
  }

  if (orders.length === 0) {
    return <h2>No orders found.</h2>;
  }

  return (
    <div>
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div key={order.id}>
          <h2>Order #{order.id}</h2>

          <p>Total: ₹{order.totalAmount}</p>
          <p>Status: {order.status}</p>

          {order.orderItems.map((item) => (
            <div key={item.id}>
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                width="150"
              />

              <p>Product: {item.product.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>
            </div>
          ))}

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Orders;
