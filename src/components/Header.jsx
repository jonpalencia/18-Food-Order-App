import { use, useContext } from 'react';
import { CartContext } from '../store/cartContext';

import Button from './UI/Button';
import logoImage from '../assets/logo.jpg';
import { userProgressContext } from '../store/userProgressContext';

export default function Header() {
  const { items } = use(CartContext);
  const { progress, showCart } = useContext(userProgressContext);
  const totalNumOfItems = items.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const handleCart = function () {
    // ... Open Cart Modal
    showCart();
  };

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImage} alt="BiteHub logo" />
        <h1>BiteHub</h1>
      </div>
      <nav>
        <Button onClick={handleCart} textOnly>
          Cart ({totalNumOfItems > 0 ? totalNumOfItems : 0})
        </Button>
      </nav>
    </header>
  );
}
