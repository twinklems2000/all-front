import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          img: action.img,
          qty: action.qty,
          price: action.price,
          order_date: new Date().toDateString(),
        },
      ];
    case 'UPDATE':
      let arr = [...state];
      arr.find((food, index) => {
        if (food.id === action.id) {
          arr[index] = {
            ...food,
            qty: action.qty,
            price: action.price,
            order_date: new Date().toDateString(),
          };
        }
        return arr;
      });
      return arr;
    case 'CLEAR':
      return [];
    default:
      console.log('error');
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
