import { createContext, useState } from 'react';

export const userProgressContext = createContext({
  progress: '',
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export default function UserProgressProvider({ children }) {
  const [progressState, setProgressState] = useState('');

  const showCart = function () {
    setProgressState('cart');
  };

  const hideCart = function () {
    setProgressState('');
  };

  const showCheckout = function () {
    setProgressState('checkout');
  };

  const hideCheckout = function () {
    setProgressState('');
  };

  const progressCtx = {
    progress: progressState,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <userProgressContext.Provider value={progressCtx}>
      {children}
    </userProgressContext.Provider>
  );
}
