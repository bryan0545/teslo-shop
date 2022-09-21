import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { ICartProduct } from '../../interfaces/cart';
import { CartContext, cartReducer } from './';
import Cookies from 'js-cookie';

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subtotal: number;
  tax: number;
  total: number;
  shippingAddress?: ShippingAddress;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
}

const CartInitialState: CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subtotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined,
};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CartInitialState);

  useEffect(() => {
    try {
      const cookieProducts = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : [];
      dispatch({ type: 'Cart - LoadCart from cookies | storage', payLoad: cookieProducts });
    } catch (error) {
      dispatch({ type: 'Cart - LoadCart from cookies | storage', payLoad: [] });
    }
  }, []);

  useEffect(() => {
    if (Cookies.get('firstName')) {
      const shippingAddress = {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zip: Cookies.get('zip') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || '',
      };
      dispatch({ type: 'Cart - LoadAddress from cookies', payLoad: shippingAddress });
    }
  }, []);

  useEffect(() => {
    if (state.cart.length > 0) {
      Cookies.set('cart', JSON.stringify(state.cart));
    }
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);
    const subtotal = state.cart.reduce((prev, current) => current.price * current.quantity + prev, 0);
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const orderSumary = {
      numberOfItems,
      subtotal,
      tax: subtotal * taxRate,
      total: subtotal * (taxRate + 1),
    };
    return dispatch({ type: 'Cart - Update order summary', payLoad: orderSumary });
  }, [state.cart]);

  const addProductCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p._id === product._id && p.size === product.size);
    if (!productInCart) return dispatch({ type: 'Cart - add product', payLoad: [...state.cart, product] });

    const updatedCart = state.cart.map((p) => {
      if (p._id !== product._id || p.size !== product.size) return p;
      p.quantity += product.quantity;
      return p;
    });

    return dispatch({ type: 'Cart - add product', payLoad: [...updatedCart] });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: 'Cart - Change cart quantity', payLoad: product });
  };

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: 'Cart - Remove product in cart', payLoad: product });
  };

  const updateAddress = (address: ShippingAddress) => {
    Cookies.set('firstName', address.firstName);
    Cookies.set('lastName', address.lastName);
    Cookies.set('address', address.address);
    Cookies.set('address2', address.address2 || '');
    Cookies.set('zip', address.zip);
    Cookies.set('city', address.city);
    Cookies.set('country', address.country);
    Cookies.set('phone', address.phone);
    dispatch({ type: 'Cart - Update Address', payLoad: address });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductCart,
        updateCartQuantity,
        removeCartProduct,
        updateAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
