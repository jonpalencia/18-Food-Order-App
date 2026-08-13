import { createContext, useReducer, useState } from 'react';

export const CartContext = createContext({
  items: [],
  addItem: item => {},
  updateItem: id => {},
});

// Reducer function
function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    // ... Add logic here.
  }

  if (action.type === 'UPDATE_ITEM') {
    // ... Add logic here.
  }

  return {
    ...state,
  };
}

export default function CartContextProvider({ children }) {
  const [cartState, dispatch] = useReducer(cartReducer, { items: [] });

  const cartCtx = {
    items: cartState.items,
    addItem: item => {},
    updateItem: id => {},
  };

  return (
    <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
  );
}
