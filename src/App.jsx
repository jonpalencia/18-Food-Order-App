import UserProgressProvider from './store/userProgressContext';
import CartContextProvider from './store/cartContext';
import Header from './components/Header';
import Meals from './components/Meals';
import Cart from './components/Cart';

function App() {
  return (
    <UserProgressProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
      </CartContextProvider>
    </UserProgressProvider>
  );
}

export default App;
