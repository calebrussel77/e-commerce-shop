import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "./product";
import { IUser } from "./user";

export interface IOrderItem extends Document {
  name?: string;
  qty: string;
  image: string[];
  price?: number;
  product: IProduct;
}
export interface IShippingAddress extends Document {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
export interface IPaymentResult extends Document {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}

export interface IOrder extends Document {
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
  user: IUser | string;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderSchema: Schema = new Schema(
  {
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        image: [
          {
            type: String,
          },
        ],
        price: {
          type: Number,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Export the model and return your IOrder interface
export default mongoose.models?.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
