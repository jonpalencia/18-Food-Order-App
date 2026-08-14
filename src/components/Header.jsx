import { use } from 'react';
import { CartContext } from '../store/cartContext';

import Button from './UI/Button';
import logoImage from '../assets/logo.jpg';

export default function Header() {
  const { items } = use(CartContext);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImage} alt="BiteHub logo" />
        <h1>BiteHub</h1>
      </div>
      <nav>
        <Button textOnly>Cart (0)</Button>
      </nav>
    </header>
  );
}
