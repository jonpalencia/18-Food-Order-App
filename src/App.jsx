import UserProgressProvider from './store/userProgressContext';
import CartContextProvider from './store/cartContext';
import Header from './components/Header';
import Meals from './components/meals/Meals';
import Cart from './components/cart/Cart';

// TODO: Add and Commit the Modal and Cart Component for the implementation of the onClose event listener whenever the modal is closed by pressing the esc key. (Also make sure to also add the onClose when Checkout component is created)
// TODO: Next to do is to implement and create a new component for the Checkout functionality upong clicking Checkout in the Cart Component, and handle the user's forms.

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
