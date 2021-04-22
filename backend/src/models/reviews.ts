import mongoose, { Schema, Document } from "mongoose";
// import { IUser } from "./user";

export interface IReview extends Document {
  rating: number;
  comment: string;
  user?: { userId: string; image: string; email: string; name: string };
  createdAt?: Date;
  updatedAt?: Date;
}
export const ReviewSchema: Schema = new Schema(
  {
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      userId: String,
      name: String,
      email: String,
      image: String,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model and return your IUser interface
export default mongoose.models?.Review ||
  mongoose.model<IReview>("Review", ReviewSchema);
