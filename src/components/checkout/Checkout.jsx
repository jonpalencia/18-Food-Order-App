import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { useContext } from 'react';
import { userProgressContext } from '../../store/userProgressContext';
import { CartContext } from '../../store/cartContext';
import { currencyFormatter } from '../../utils/utils';
import { MEALS_URL } from '../../utils/config';

export default function Checkout() {
  const userProgressCtx = useContext(userProgressContext);
  const cartCtx = useContext(CartContext);

  const totalSum = cartCtx.items.reduce((acc, item) => {
    return acc + Number(item.price) * Number(item.quantity);
  }, 0);

  const handleCloseCheckout = function () {
    userProgressCtx.hideCheckout();
  };

  const handleSubmit = async function (e) {
    e.preventDefault();
    try {
      const userInputValues = Object.fromEntries(new FormData(e.target));
      const payloadJSON = JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: userInputValues,
        },
      });

      const requestOrder = await fetch(`${MEALS_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: payloadJSON,
      });

      if (!requestOrder)
        throw new Error(`Checkout order failed, please try again...`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      open={userProgressCtx.progress === 'checkout'}
      onClose={handleCloseCheckout}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalSum)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street Adress" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className="modal-actions">
          <Button textOnly type="button" onClick={handleCloseCheckout}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
