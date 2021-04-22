import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
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
}

const UserSchema: Schema = new Schema(
  {
    image: {
      type: String,
      default: "/images/profil-avatar.png",
    },
    name: { type: String, required: true },
    website: { type: String, default: "" },
    state: { type: String, default: "" },
    city: { type: String, default: "" },
    zipCode: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

// Export the model and return your IUser interface
export default mongoose.models?.User ||
  mongoose.model<IUser>("User", UserSchema);
