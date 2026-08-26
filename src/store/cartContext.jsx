import { createContext, useReducer } from 'react';

export const CartContext = createContext({
  items: [],
  addItem: item => {},
  removeItem: id => {},
  clearCart: () => {},
});

// Reducer function
function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    // ... Add to cart feature
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.payload.id,
    );
    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.payload, quantity: 1 });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === 'REMOVE_ITEM') {
    // ... Update cart feature

    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.payload,
    );

    const existingCartItem = state.items[existingCartItemIndex];

    // Guard clause if no quantity yet
    if (!existingCartItem?.quantity) {
      return { ...state };
    }

    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };

      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  // Reset / Clear all items in the cart.
  if (action.type === 'CLEAR_CART') {
    return { ...state, items: [] };
  }

  return state;
}

export default function CartContextProvider({ children }) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  });

  const addItem = function (item) {
    // ... Add to cart feature
    dispatchCartAction({
      type: 'ADD_ITEM',
      payload: item,
    });
  };

  const removeItem = function (id) {
    // ... Remove item feature
    dispatchCartAction({
      type: 'REMOVE_ITEM',
      payload: id,
    });
  };

  const clearCart = function () {
    // ... Clear cart feature
    dispatchCartAction({
      type: 'CLEAR_CART',
    });
  };

  const cartCtx = {
    items: cartState.items,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
  );
}
