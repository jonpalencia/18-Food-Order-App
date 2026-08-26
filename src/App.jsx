import UserProgressProvider from './store/userProgressContext';
import CartContextProvider from './store/cartContext';
import Header from './components/Header';
import Meals from './components/meals/Meals';
import Cart from './components/cart/Cart';
import Checkout from './components/Checkout/Checkout';

function App() {
  return (
    <UserProgressProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressProvider>
  );
}

export default App;
