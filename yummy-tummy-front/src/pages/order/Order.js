import React, { useState } from 'react';
import './order.css';
import { useCart, useCartDispatch } from '../../components/ContextReducer';
import Card from '../../components/common/card/Card';
import Button from '../../components/common/button/Button';
import DeliverBoyImg from '../../assets/images/delivery-boy.gif';
import { toastService } from '../../constant/data';

const Order = () => {
  const foodData = useCart();
  const dispatch = useCartDispatch();
  const [orderPlace, setOrderPlace] = useState(true);

  const handleOrder = async () => {
    let email = JSON.parse(localStorage.getItem('user')).email;
    let result = await fetch('https://yummytummy-client.onrender.com/placeOrder', {
      method: 'post',
      body: JSON.stringify({
        email: email,
        order_data: foodData,
      }),
      headers: {
        'Content-Type': 'application/json',
        authorization: 'bearer ' + JSON.parse(localStorage.getItem('auth')),
      },
    });

    result = await result.json();

   if (result?.errors) {
      // eslint-disable-next-line array-callback-return
      result.errors?.map((item) => {
        toastService.error(item?.msg);
      });
    } else {
      setOrderPlace(false);
      toastService.success(result?.message);
      dispatch({ type: 'CLEAR' });
    }
  };

  return (
    <>
      {orderPlace ? (
        <div className="order">
          {foodData?.length > 0 ? (
            foodData?.map((item) => {
              return <Card foodDetail={item} />;
            })
          ) : (
            <h1>Your cart is empty 🛒</h1>
          )}
        </div>
      ) : (
        <img src={DeliverBoyImg} className="gifStyle" alt='delivered_logo' />
      )}
      {foodData?.length > 0 && (
        <div className="buttonContainer">
          {orderPlace && (
            <Button
              title="Place an Order"
              customClass="orderBtn"
              handleClick={handleOrder}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Order;
