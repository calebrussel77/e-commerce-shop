"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_1 = __importDefault(require("../models/product"));
const reviews_1 = __importDefault(require("../models/reviews"));
/**
 * ProductService class handles the logic needed to work with the product data.
 * @class
 * @public
 * @author Caleb russel
 */
class ProductService {
    /**
     * Creates an instance of product service.
     * @author Caleb russel
     */
    constructor() {
        this.getProducts = this.getProducts.bind(this);
        this.getProductById = this.getProductById.bind(this);
        this.getProductsSortedByRating = this.getProductsSortedByRating.bind(this);
        this.getProductPopulatedById = this.getProductPopulatedById.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.deleteProductById = this.deleteProductById.bind(this);
        this.addReview = this.addReview.bind(this);
    }
    /**
     * get all products
     * @public
     * @method {getProducts}
     * @author Caleb russel
     * @returns {Promise<IProduct[]>} products array
     */
    getProducts() {
        return product_1.default.find().then((result) => result);
    }
    /**
     * get all top products sorted by rating
     * @public
     * @method {getProductsSortedByRating}
     * @author Caleb russel
     * @returns {Promise<IProduct[]>} products array
     */
    getProductsSortedByRating() {
        return product_1.default.find()
            .sort({ rating: -1 })
            .limit(4)
            .then((result) => result);
    }
    /**
     * delete all products
     * @public
     * @method {deleteProductById}
     * @author Caleb russel
     * @returns {Promise<any>}
     */
    deleteProductById(productId) {
        return product_1.default.findByIdAndRemove(productId).then((result) => result);
    }
    /**
     * get single product
     * @public
     * @method {getProductById}
     * @author Caleb russel
     * @returns {Promise<IProduct | null>} single product informations
     */
    getProductById(productId) {
        return product_1.default.findById(productId).then((result) => result);
    }
    /**
     * get single product
     * @public
     * @method {getProductById}
     * @author Caleb russel
     * @returns {Promise<IProduct | null>} single product informations
     */
    getProductPopulatedById(productId) {
        return product_1.default.findById(productId)
            .populate("reviews")
            .then((result) => result);
    }
    /**
     * create a new review item
     * @public
     * @method {addOrdersItems}
     * @author Caleb russel
     * @returns {Promise<IOrder | null>} order
     */
    addReview(review) {
        let newReview = new reviews_1.default(review);
        return newReview.save();
    }
    /**
     * create a new product
     * @public
     * @method {addProduct}
     * @author Caleb russel
     * @returns {Promise<IProduct | null>}
     */
    addProduct(userId) {
        const newProduct = new product_1.default({
            name: "Example de nom",
            image: "/images/phone.jpg",
            description: "Exemple de description",
            brand: "exemple de marque",
            category: "exemple de catégorie",
            price: 0,
            user: userId,
            countInStock: 0,
            numReviews: 0,
        });
        return newProduct.save();
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=productService.js.map