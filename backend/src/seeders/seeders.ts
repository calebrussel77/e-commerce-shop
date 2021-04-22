import mongoose from "mongoose";
import dotenv from "dotenv";
import usersData from "../data/users.data";
import productsData from "../data/products.data";
import Order from "../models/order";
import Product from "../models/product";
import User from "../models/user";

//enable env variables
dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL!, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB is Connected SUCCESSFUL !");
  })
  .catch((err: Error) => {
    console.log(err);
  });

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(usersData);
    const adminUser = createdUsers[0]?._id;

    const sampleProducts = productsData.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported !");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed !");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//check the flag of the script and
//run function according to the flag
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
