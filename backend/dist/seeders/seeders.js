"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_data_1 = __importDefault(require("../data/users.data"));
const products_data_1 = __importDefault(require("../data/products.data"));
const order_1 = __importDefault(require("../models/order"));
const product_1 = __importDefault(require("../models/product"));
const user_1 = __importDefault(require("../models/user"));
//enable env variables
dotenv_1.default.config();
mongoose_1.default
    .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log("MongoDB is Connected SUCCESSFUL !");
})
    .catch((err) => {
    console.log(err);
});
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        yield order_1.default.deleteMany();
        yield product_1.default.deleteMany();
        yield user_1.default.deleteMany();
        const createdUsers = yield user_1.default.insertMany(users_data_1.default);
        const adminUser = (_a = createdUsers[0]) === null || _a === void 0 ? void 0 : _a._id;
        const sampleProducts = products_data_1.default.map((product) => {
            return Object.assign(Object.assign({}, product), { user: adminUser });
        });
        yield product_1.default.insertMany(sampleProducts);
        console.log("Data Imported !");
        process.exit();
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
});
const destroyData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield order_1.default.deleteMany();
        yield product_1.default.deleteMany();
        yield user_1.default.deleteMany();
        console.log("Data Destroyed !");
        process.exit();
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
});
//check the flag of the script and
//run function according to the flag
if (process.argv[2] === "-d") {
    destroyData();
}
else {
    importData();
}
//# sourceMappingURL=seeders.js.map