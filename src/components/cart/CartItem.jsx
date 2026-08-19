import { useContext } from 'react';
import { currencyFormatter } from '../../utils/utils';
import { CartContext } from '../../store/cartContext';

export default function CartItem({ item, onAddItem, onReduceItem }) {
  const { id, name, price, description, image, quantity } = item;
  const totalItemPrice = currencyFormatter.format(
    Number(price) * Number(quantity),
  );

  return (
    <li className="cart-item">
      <p>
        {name} - {totalItemPrice}
      </p>
      <p className="cart-item-actions">
        <button onClick={onReduceItem}>-</button>
        <span>{quantity}</span>
        <button onClick={onAddItem}>+</button>
      </p>
    </li>
  );
}
