import { CartState, ShippingAddress } from '.';
import { ICartProduct } from '../../interfaces/cart';

type CartActionType =
  | { type: 'Cart - LoadCart from cookies | storage'; payLoad: ICartProduct[] }
  | { type: 'Cart - add product'; payLoad: ICartProduct[] }
  | { type: 'Cart - Change cart quantity'; payLoad: ICartProduct }
  | { type: 'Cart - Remove product in cart'; payLoad: ICartProduct }
  | { type: 'Cart - LoadAddress from cookies'; payLoad: ShippingAddress }
  | { type: 'Cart - Update Address'; payLoad: ShippingAddress }
  | {
      type: 'Cart - Update order summary';
      payLoad: {
        numberOfItems: number;
        subtotal: number;
        tax: number;
        total: number;
      };
    };

export const cartReducer = (state: CartState, actions: CartActionType): CartState => {
  console.log('actions.type', actions.type);
  switch (actions.type) {
    case 'Cart - LoadCart from cookies | storage':
      return {
        ...state,
        isLoaded: true,
        cart: actions.payLoad,
      };
    case 'Cart - add product':
      return {
        ...state,
        cart: [...actions.payLoad],
      };
    case 'Cart - Change cart quantity':
      return {
        ...state,
        cart: state.cart.map((p) => {
          if (p._id !== actions.payLoad._id || p.size !== actions.payLoad.size) return p;
          return actions.payLoad;
        }),
      };
    case 'Cart - Remove product in cart':
      return {
        ...state,
        cart: state.cart.filter((p) => !(p._id === actions.payLoad._id && p.size === actions.payLoad.size)),
      };
    case 'Cart - Update order summary':
      return {
        ...state,
        ...actions.payLoad,
      };
    case 'Cart - Update Address':
    case 'Cart - LoadAddress from cookies':
      return {
        ...state,
        shippingAddress: actions.payLoad,
      };

    default:
      return state;
  }
};
