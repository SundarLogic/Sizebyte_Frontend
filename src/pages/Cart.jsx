import { useEffect, useState } from "react";
import { getCart, updateCart, deleteCartItem, checkout } from "../api/api";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    getCart(token)
      .then((data) => {
        setCartItems(data.cartItems || []);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const handleUpdate = (productId, quantity) => {
    updateCart(productId, quantity, token)
      .then(() => {
        return getCart(token);
      })
      .then((data) => {
        setCartItems(data.cartItems || []);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleDelete = (productId) => {
    deleteCartItem(productId, token)
      .then(() => {
        setCartItems((currentItems) =>
          currentItems.filter((item) => item.productId !== productId),
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleCheckout = () => {
    checkout(token)
      .then((data) => {
        alert(data.message);

        return getCart(token);
      })
      .then((data) => {
        setCartItems(data.cartItems || []);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  if (!token) {
    return <h2>Please login to view your cart.</h2>;
  }

  if (loading) {
    return <h2>Loading cart...</h2>;
  }

  if (cartItems.length === 0) {
    return <h2>Your cart is empty.</h2>;
  }

  return (
    <div>
      <h1>My Cart</h1>

      {cartItems.map((item) => (
        <div key={item.productId}>
          <img
            src={item.product.imageUrl}
            alt={item.product.name}
            width="150"
          />

          <h2>{item.product.name}</h2>

          <p>Price: ₹{item.product.price}</p>

          <p>Quantity: {item.quantity}</p>

          <button
            onClick={() => handleUpdate(item.productId, item.quantity + 1)}
          >
            +
          </button>

          <button
            onClick={() => {
              if (item.quantity > 1) {
                handleUpdate(item.productId, item.quantity - 1);
              }
            }}
          >
            -
          </button>

          <button onClick={() => handleDelete(item.productId)}>Remove</button>

          <hr />
        </div>
      ))}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default Cart;
