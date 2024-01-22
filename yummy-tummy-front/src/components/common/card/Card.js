import React, { useState } from 'react';
import './card.css';
import Button from '../button/Button';
import { useCart, useCartDispatch } from '../../ContextReducer';
import { useLocation } from 'react-router-dom';
import { toastService } from '../../../constant/data';

const Card = ({ foodDetail }) => {
  const [qty, setQty] = useState('1');
  let optionData = [1, 2, 3];
  const dispatch = useCartDispatch();
  const data = useCart();
  const location = useLocation();

  const handleCart = async () => {
    toastService.success('Item is added to cart');
    let food = [];
    data?.map((item) => {
      if (item?.id === foodDetail._id) {
        return (food = item);
      }
    });
    if (data?.length > 0 && foodDetail._id === food.id && food.qty !== qty) {
      await dispatch({
        type: 'UPDATE',
        id: foodDetail._id,
        qty: qty,
        price: qty * foodDetail.price,
      });
      return;
    } else {
      await dispatch({
        type: 'ADD',
        id: foodDetail._id,
        name: foodDetail.name,
        img: foodDetail.img,
        qty: qty,
        price: qty * foodDetail.price,
      });
      return;
    }
  };

  return (
    <>
      <div className="card">
        <img src={foodDetail.img} className="imgStyle" />
        <div className="infoContainer">
          <p style={{ fontSize: '18px', fontWeight: '600' }}>
            {foodDetail.name}
          </p>
          <p style={{ fontSize: '16px', fontWeight: '500' }}>
            Price: {qty * foodDetail.price}
          </p>
          {location.pathname !== '/order' && (
            <div className="optionContainer">
              <select onChange={(e) => setQty(e.target.value)}>
                {optionData?.map((item, index) => {
                  return <option key={index}>{item}</option>;
                })}
              </select>
            </div>
          )}

          {location.pathname !== '/order' && (
            <Button title="Add" handleClick={handleCart} />
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
