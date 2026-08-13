import { createContext, useState } from 'react';

export const CartContext = createContext({
  item: [],
  handleAddToCart: () => {},
  handleUpdateCart: () => {},
});

export default function CartContextProvider({ children }) {
  const [mealState, setMealState] = useState([]);

  return <CartContext.Provider>{children}</CartContext.Provider>;
}
