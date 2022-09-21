import { createContext } from 'react';
import { ICartProduct } from '../../interfaces/cart';
import { ShippingAddress } from './CartProvider';

interface ContextProps {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subtotal: number;
  tax: number;
  total: number;
  shippingAddress?: ShippingAddress;
  addProductCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
  updateAddress: (address: ShippingAddress) => void;
}

export const CartContext = createContext({} as ContextProps);
