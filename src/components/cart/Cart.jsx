import { useContext } from 'react';
import { CartContext } from '../../store/cartContext';
import { currencyFormatter } from '../../utils/utils';
import { userProgressContext } from '../../store/userProgressContext';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import CartItem from './CartItem';

export default function Cart({}) {
  const { items, addItem, removeItem } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(userProgressContext);
  const cartPriceTotal = items.reduce((sum, item) => {
    return sum + Number(item.price * item.quantity);
  }, 0);

  const handleCloseCart = function () {
    hideCart();
  };

  const handleGoToCheckout = function () {
    showCheckout();
  };

  return (
    <Modal
      className="cart"
      open={progress === 'cart'}
      onClose={progress === 'cart' ? handleCloseCart : null} // By attaching the handleCloseCart will synchronize the hideCart / hideCheckout.
    >
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p className="cart-empty">
          🛒 You don't have any items in the cart yet...{' '}
        </p>
      ) : (
        <>
          <ul>
            {items.map(item => {
              return (
                <CartItem
                  key={item.id}
                  item={item}
                  onAddItem={() => addItem(item)}
                  onReduceItem={() => removeItem(item.id)}
                />
              );
            })}
          </ul>
          <p className="cart-total">
            {currencyFormatter.format(cartPriceTotal)}
          </p>
        </>
      )}
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
