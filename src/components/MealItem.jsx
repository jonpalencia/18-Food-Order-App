import { use, useCallback, useContext } from 'react';
import { CartContext } from '../store/cartContext';
import Button from './UI/Button';
import { MEALS_URL } from '../utils/config';
import { currencyFormatter } from '../utils/utils';

export default function MealItem({ meal }) {
  const { id, name, image, description, price } = meal;
  const { items, addItem, removeItem } = useContext(CartContext);

  const handleAddToCart = function (e) {
    addItem(meal);
  };

  const handleRemoveItem = function () {
    removeItem(id);
  };

  return (
    <li className="meal-item" key={id}>
      <article>
        <img src={`${MEALS_URL}/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(price)}</p>
          <p className="meal-item-description">{description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
