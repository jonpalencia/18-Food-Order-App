import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { useContext } from 'react';
import { userProgressContext } from '../../store/userProgressContext';
import { CartContext } from '../../store/cartContext';
import { currencyFormatter } from '../../utils/utils';

export default function Checkout({}) {
  const userProgressCtx = useContext(userProgressContext);
  const cartCtx = useContext(CartContext);

  const totalSum = cartCtx.items.reduce((acc, item) => {
    return acc + Number(item.price) * Number(item.quantity);
  }, 0);

  const handleCloseCheckout = function () {
    userProgressCtx.hideCheckout();
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    const userInputValues = Object.fromEntries(new FormData(e.target));
    // Destrutured version of the form data
    const {
      email,
      ['full-name']: fullName,
      ['postal-code']: postalCode,
      street,
      city,
    } = userInputValues;

    console.log({ email, fullName, postalCode, street, city }, userInputValues);
  };

  return (
    <Modal
      open={userProgressCtx.progress === 'checkout'}
      onClose={handleCloseCheckout}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalSum)}</p>
        <Input label="Full Name" type="text" id="full-name" />
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
