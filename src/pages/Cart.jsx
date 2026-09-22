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

  const totalAmount = cartItems.reduce(
    (total, item) => total + Number(item.product.price) * Number(item.quantity),
    0,
  );

  if (!token) {
    return <h2 className="page-message">Please login to view your cart.</h2>;
  }

  if (loading) {
    return <h2 className="page-message">Loading cart...</h2>;
  }

  if (cartItems.length === 0) {
    return <h2 className="page-message">Your cart is empty.</h2>;
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>My Cart</h1>
        <p>Review your products before checkout</p>
      </div>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.productId}>
            <img src={item.product.imageUrl} alt={item.product.name} />

            <div className="cart-product-info">
              <h2>{item.product.name}</h2>

              <p>Price: ₹{item.product.price}</p>

              <div className="cart-quantity">
                <span>Quantity:</span>

                <button
                  onClick={() => {
                    if (item.quantity > 1) {
                      handleUpdate(item.productId, item.quantity - 1);
                    }
                  }}
                  disabled={item.quantity === 1}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    handleUpdate(item.productId, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="remove-button"
              onClick={() => handleDelete(item.productId)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Total: ₹{totalAmount.toFixed(2)}</h2>

        <button className="checkout-button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
