import { createContext, useReducer, useState } from 'react';

export const CartContext = createContext({
  items: [],
  addItem: item => {},
  removeItem: id => {},
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

  return state;
}

export default function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, { items: [] });

  const addItem = function (item) {
    // ... Add to cart feature
    cartDispatch({
      type: 'ADD_ITEM',
      payload: item,
    });
  };

  const removeItem = function (id) {
    // ... Remove item feature
    cartDispatch({
      type: 'REMOVE_ITEM',
      payload: id,
    });
  };

  const cartCtx = {
    items: cartState.items,
    addItem,
    removeItem,
  };

  return (
    <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
  );
}
