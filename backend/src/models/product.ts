import mongoose, { Schema, Document } from "mongoose";
import { IReview } from "./reviews";
import { IUser } from "./user";

export interface IProduct extends Document {
  name: string;
  image: string[];
  description: string;
  brand: string;
  category: string;
  reviews?: IReview[];
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  user: IUser | string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    image: [{ type: String }],
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
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

// Export the model and return your IProduct interface
export default mongoose.models?.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
