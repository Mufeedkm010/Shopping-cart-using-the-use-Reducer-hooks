import React, { useReducer } from 'react';
import './ShoppingCart.css';
import img1 from './img/img1.jpg';
import img2 from './img/img2.jpg';
import img3 from './img/img3.jpeg';
import img4 from './img/img4.jpg';


const initialState = {
  cart: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };
    default:
      return state;
  }
}

const ShoppingCart = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const items = [
    { id: 1, name: 'Apple', price: 25, image: img1 },
    { id: 2, name: 'Orange', price: 50, image: img2 },
    { id: 3, name: 'Mango', price: 40, image: img3 },
    { id: 4, name: 'Banana', price: 30, image: img4 },
  ];

  const addItemToCart = item => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const updateItemQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItemFromCart = id => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const totalPrice = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <header>My Shopping Cart</header>

      <div className="container">
        <h2>ITEMS</h2>
        <div className="items">
          {items.map(item => (
            <div key={item.id} className="item">
              <img src={item.image} alt={item.name} className="item-image" />
              <p>{item.name}</p>
              <p>Price: ${item.price}</p>
              <button onClick={() => addItemToCart(item)}>Add to Cart</button>
            </div>
          ))}
        </div>

        <h2>Shopping Cart</h2>
        <div className="cart">
          {state.cart.length === 0 ? (
            <p>No items in the cart</p>
          ) : (
            <ul>
              {state.cart.map(item => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <p>{item.name} - ${item.price} x {item.quantity}</p>
                  <div>
                    <button
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                    <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {state.cart.length > 0 && (
          <div className="total-price">
            Total Price: ${totalPrice.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
