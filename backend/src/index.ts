import dotenv from "dotenv";
import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";

import productsRoutes from "./routes/products";
import usersRoutes from "./routes/users";
import ordersRoutes from "./routes/orders";
import morgan from "morgan";

import Server from "./server";
import { get404, handleError } from "./middlewares/error";

//enable env variables
dotenv.config();

const server = new Server(process.env.PORT || "4000");
const app = server.app;

//declare app middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "../../uploads", "images"))
);
app.use(express.static(path.join("public")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// declare api routes
app.get("/api/config/paypal", (_req: Request, resp: Response) =>
  resp.send(process.env.PAYPAL_CLIENT_ID!)
);
app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", ordersRoutes);

app.use((_req, resp, _next) => {
  resp.sendFile(path.resolve(__dirname, "../../public", "index.html"));
});

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../../frontend", "build")));

// app.get("*", (_req, resp) =>
//   resp.sendFile(path.join(__dirname, "../../frontend", "build", "index.html"))
// );
// } else {
//   app.get("/", (_req, resp) => {
//     resp.send("API is Running...");
//   });
// }

//Handle Errors for errors occurs
//!important : must be placed after api routes declaration
app.use(get404);
app.use(handleError);

mongoose
  .connect(process.env.DATABASE_URL!, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB is Connected SUCCESSFUL !");
    server.start();
  })
  .catch((err: Error) => {
    console.log(err);
  });
