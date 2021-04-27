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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const response_1 = require("../utils/response");
const cloudinary_config_1 = require("../utils/cloudinary-config");
class ProductController {
    /**
     * @description Creates an instance of product controller.
     * @author Caleb Russel
     * @constructor
     * @param {ProductService} productService
     */
    constructor(productService) {
        /**
         * Get all the products stored at the db
         * @get
         * @async
         * @public
         */
        this.getProducts = (_req, resp) => __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productService.getProducts();
            return response_1.apiResponse(resp, response_1.successResponse({
                msg: "Liste des produits",
                products: products,
                success: true,
            }), 200);
        });
        /**
         * Get Products Sorted By top Rating
         * @get
         * @async
         * @public
         */
        this.getProductsSortedByRating = (_req, resp) => __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productService.getProductsSortedByRating();
            return response_1.apiResponse(resp, response_1.successResponse({
                products: products,
                success: true,
            }), 200);
        });
        /**
         * Get single product by id
         * @get
         * @async
         * @public
         */
        this.getProductById = (req, resp) => __awaiter(this, void 0, void 0, function* () {
            const productId = req.params.productId;
            const product = yield this.productService.getProductPopulatedById(productId);
            if (product) {
                return response_1.apiResponse(resp, response_1.successResponse({
                    msg: "Information du produit selectionné",
                    product: product,
                    success: true,
                }), 200);
            }
            else {
                resp.status(404);
                throw new Error("Ce produit n'existe pas.");
            }
        });
        /**
         * get Top Rated Product
         * @get
         * @async
         * @public
         */
        this.getTopRatedProduct = (_req, resp) => __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.getProductsSortedByRating();
            if (product) {
                return response_1.apiResponse(resp, response_1.successResponse({
                    msg: "Information du produit selectionné",
                    product: product,
                    success: true,
                }), 200);
            }
            else {
                resp.status(404);
                throw new Error("Ce produit n'existe pas.");
            }
        });
        /**
         * delete single product by id
         * @delete
         * @async
         * @private/admin
         */
        this.deleteProductById = (req, resp) => __awaiter(this, void 0, void 0, function* () {
            const productId = req.params.productId;
            const response = yield this.productService.deleteProductById(productId);
            if (response) {
                return response_1.apiResponse(resp, response_1.successResponse({
                    msg: "Le produit a bien été supprimé.",
                    success: true,
                }), 200);
            }
            else {
                resp.status(404);
                throw new Error("Ce produit n'existe pas.");
            }
        });
        /**
         * Create a new product on the db
         * @post
         * @async
         * @public
         */
        this.addProduct = (req, resp) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const createdProduct = yield this.productService.addProduct((_a = req === null || req === void 0 ? void 0 : req.userData) === null || _a === void 0 ? void 0 : _a._id);
            return response_1.apiResponse(resp, response_1.successResponse({
                msg: "Produit ajouté avec succès",
                createdProduct,
                success: true,
            }), 201);
        });
        /**
         * Create a new review on the db
         * @post
         * @async
         * @private
         */
        this.addReview = (req, resp) => __awaiter(this, void 0, void 0, function* () {
            var _b, _c, _d, _e, _f;
            const { rating, comment } = req.body;
            const productFound = yield this.productService.getProductPopulatedById(req.params.productId);
            if (productFound) {
                const foundIfAlredyRevied = (_b = productFound.reviews) === null || _b === void 0 ? void 0 : _b.find((r) => { var _a, _b; return ((_b = (_a = r.user) === null || _a === void 0 ? void 0 : _a.userId) === null || _b === void 0 ? void 0 : _b.toString()) === req.userData._id.toString(); });
                console.log({ foundIfAlredyRevied });
                if (foundIfAlredyRevied) {
                    resp.status(404);
                    throw new Error("Ce produit a déjà été commenté par vous.");
                }
                const review = {
                    rating,
                    comment,
                    user: {
                        userId: req.userData._id,
                        email: req.userData.email,
                        name: req.userData.name,
                        image: req.userData.image,
                    },
                };
                const newReview = yield this.productService.addReview(review);
                (_c = productFound.reviews) === null || _c === void 0 ? void 0 : _c.push(newReview);
                productFound.numReviews = (_d = productFound.reviews) === null || _d === void 0 ? void 0 : _d.length;
                productFound.rating = Number(((_e = productFound.reviews) === null || _e === void 0 ? void 0 : _e.reduce((accumulator, currentValue) => currentValue.rating + accumulator, 0)) / ((_f = productFound.reviews) === null || _f === void 0 ? void 0 : _f.length));
                yield (productFound === null || productFound === void 0 ? void 0 : productFound.save());
                return response_1.apiResponse(resp, response_1.successResponse({
                    msg: "Commentaire ajouté avec succès.",
                    createdReview: productFound,
                    success: true,
                }), 200);
            }
            else {
                resp.status(404);
                throw new Error("Ce produit n'existe pas.");
            }
        });
        /**
         * update existing product on the db
         * @put
         * @async
         * @private/admin
         */
        this.updateProduct = (req, resp) => __awaiter(this, void 0, void 0, function* () {
            var _g;
            const productId = req.params.productId;
            const files = (_g = req.body) === null || _g === void 0 ? void 0 : _g.image;
            const productFound = yield this.productService.getProductById(productId);
            if (productFound) {
                if (files) {
                    for (const file of files) {
                        const newImg = yield cloudinary_config_1.cloudinaryUpload(file);
                        productFound.image.push(newImg.secure_url);
                    }
                }
                productFound.name = req.body.name || productFound.name;
                productFound.price = req.body.price || productFound.price;
                productFound.brand = req.body.brand || productFound.brand;
                productFound.description =
                    req.body.description || productFound.description;
                productFound.category = req.body.category || productFound.category;
                productFound.countInStock =
                    req.body.countInStock || productFound.countInStock;
                const updatedProduct = yield productFound.save();
                return response_1.apiResponse(resp, response_1.successResponse({
                    msg: "Informations du produit mis à jour.",
                    updatedProduct,
                    success: true,
                }), 200);
            }
            else {
                resp.status(404);
                throw new Error("Produit non trouvé.");
            }
        });
        this.productService = productService;
        this.getProducts = this.getProducts.bind(this);
        this.getProductsSortedByRating = this.getProductsSortedByRating.bind(this);
        this.getProductById = this.getProductById.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.addReview = this.addReview.bind(this);
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=productController.js.map