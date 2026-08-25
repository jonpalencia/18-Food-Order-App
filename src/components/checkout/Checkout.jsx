import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Error from '../UI/Error';
import { useContext } from 'react';
import { userProgressContext } from '../../store/userProgressContext';
import { CartContext } from '../../store/cartContext';
import { currencyFormatter, defaultObj } from '../../utils/utils';
import { MEALS_URL } from '../../utils/config';
import useHttp from '../../hooks/useHttp';

const configMethod = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function Checkout() {
  const {
    data,
    error,
    isLoading: isSending,
    sendRequest,
    clearData,
  } = useHttp(`${MEALS_URL}/orders`, configMethod);
  const userProgressCtx = useContext(userProgressContext);
  const cartCtx = useContext(CartContext);

  const totalSum = cartCtx.items.reduce((acc, item) => {
    return acc + Number(item.price) * Number(item.quantity);
  }, 0);

  const handleCloseCheckout = function () {
    userProgressCtx.hideCheckout();
  };

  const handleFinishSubmit = function () {
    cartCtx.clearCart();
    userProgressCtx.hideCheckout();
    clearData(defaultObj.initData);
  };

  const handleSubmit = async function (e) {
    e.preventDefault();
    const userInputValues = Object.fromEntries(new FormData(e.target));
    const payloadJSON = JSON.stringify({
      order: {
        items: cartCtx.items,
        customer: userInputValues,
      },
    });
    sendRequest(payloadJSON);
  };

  if (!Array.isArray(data) && data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === 'checkout'}
        onClose={handleFinishSubmit}
      >
        <h2>Your order has been succesfully placed!</h2>
        <p>Your order is now preparing...</p>
        <p>Your food will arive soon</p>
        <Button onClick={handleFinishSubmit}>Okay</Button>
      </Modal>
    );
  }

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

        {error && (
          <Error
            title="Submit order failed"
            message="Please try to check and submit your order again...."
          />
        )}

        <p className="modal-actions">
          {isSending ? (
            <span>Placing your order...</span>
          ) : (
            <>
              <Button textOnly type="button" onClick={handleCloseCheckout}>
                Close
              </Button>
              <Button>Submit Order</Button>
            </>
          )}
        </p>
      </form>
    </Modal>
  );
}
