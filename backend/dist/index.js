"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const products_1 = __importDefault(require("./routes/products"));
const users_1 = __importDefault(require("./routes/users"));
const orders_1 = __importDefault(require("./routes/orders"));
const uploads_1 = __importDefault(require("./routes/uploads"));
const morgan_1 = __importDefault(require("morgan"));
const server_1 = __importDefault(require("./server"));
const error_1 = require("./middlewares/error");
//enable env variables
dotenv_1.default.config();
const server = new server_1.default(process.env.PORT || "4000");
const app = server.app;
//declare app middlewares
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/uploads/images", express_1.default.static(path_1.default.join(__dirname, "../../uploads", "images")));
app.use(express_1.default.static(path_1.default.join("public")));
if (process.env.NODE_ENV === "development") {
    app.use(morgan_1.default("dev"));
}
// declare api routes
app.get("/api/config/paypal", (_req, resp) => resp.send(process.env.PAYPAL_CLIENT_ID));
app.use("/api/products", products_1.default);
app.use("/api/users", users_1.default);
app.use("/api/orders", orders_1.default);
app.use("/api/uploads", uploads_1.default);
app.use((_req, resp, _next) => {
    resp.sendFile(path_1.default.resolve(__dirname, "../../public", "index.html"));
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
app.use(error_1.get404);
app.use(error_1.handleError);
mongoose_1.default
    .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log("MongoDB is Connected SUCCESSFUL !");
    server.start();
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map