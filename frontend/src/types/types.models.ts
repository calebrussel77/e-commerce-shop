import { ReactNode } from "react";

export const applicationJson = "application/json";

// @ts-ignore interface can only extend interface or class
interface FixedLengthArray<T extends any[], L extends number> extends T {
  length: L;
}

export type ProductType = {
  _id?: string;
  name: string;
  image: FixedLengthArray<string[], 8>;
  description: string;
  brand: string;
  category: string;
  reviews?: [];
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  user?: string;
};
export interface INotification {
  id: string;
  type: string;
  msg: string;
}
export interface ICartItem {
  product: string;
  name: string;
  price?: number;
  countInStock?: number;
  qty?: number;
  image?: string;
}
export interface IProductProps {
  children?: ReactNode;
  productItem: ProductType;
}

export interface IState {
  product?: any;
  notif?: any;
  cart?: any;
  user?: any;
  order?: any;
  orderPay?: any;
  userOrders?: any;
  userList?: any;
  userUpdate?: any;
  userEdit?: any;
  productCreate?: any;
  productUpdate?: any;
  orderList?: any;
  orderDeliver?: any;
  productCreateReview?: any;
  productRatingTop?: any;
}
export interface IRatingProps {
  children?: ReactNode;
  value: number;
  text?: string;
}

export interface IReview {
  _id: string;
  rating: number;
  comment: string;
  user?: { userId: string; image: string; email: string; name: string };
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
export interface IOrderItem {
  name?: string;
  qty: string;
  image: string;
  price?: number;
  product: string;
}

export interface IPaymentResult {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}

export interface IOrder {
  _id?: string;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  paymentResult: Partial<IPaymentResult>;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isDelivered?: boolean;
  deliveredAt?: Date;
  user: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  _id?: string;
  image?: string;
  email: string;
  name: string;
  password?: string;
  isAdmin?: boolean;
  website?: string;
  state?: string;
  city?: string;
  zipCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
  token?: string;
}
export interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
declare global {
  interface Window {
    paypal: any;
  }
}

// interface MatchParams {
//   id: string;
// }

// interface Props extends RouteComponentProps<MatchParams> {}
