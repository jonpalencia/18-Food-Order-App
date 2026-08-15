import { useContext } from 'react';
import Modal from './UI/Modal';
import Button from './UI/Button';
import { CartContext } from '../store/cartContext';
import { currencyFormatter } from '../utils/utils';
import { userProgressContext } from '../store/userProgressContext';

export default function Cart({}) {
  const { items } = useContext(CartContext);
  const { progress } = useContext(userProgressContext);
  const cartPriceTotal = items.reduce((sum, item) => {
    return sum + Number(item.price * item.quantity);
  }, 0);

  return (
    <Modal className="cart" open={progress === 'cart'}>
      <h2>Your Cart</h2>
      <ul>
        {items.map(item => {
          return (
            <li key={item.id}>
              {item.name} - {item.quantity}
            </li>
          );
        })}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartPriceTotal)}</p>
      <p className="modal-actions">
        <Button textOnly={true}>Close</Button>
        <Button>Go to Checkout</Button>
      </p>
    </Modal>
  );
}
