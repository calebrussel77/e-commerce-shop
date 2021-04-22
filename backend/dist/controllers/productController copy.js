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
         * Get single product by id
         * @get
         * @async
         * @public
         */
        this.getProductById = (req, resp) => __awaiter(this, void 0, void 0, function* () {
            const productId = req.params.id;
            const product = yield this.productService.getProductById(productId);
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
         * Create a new product on the db
         * @post
         * @async
         * @public
         */
        this.addProduct = (req, resp) => __awaiter(this, void 0, void 0, function* () {
            const product = req.body;
            const createdProduct = yield this.productService.addProduct(product);
            return response_1.apiResponse(resp, response_1.successResponse({
                msg: "Produit ajouté avec succès",
                newProduct: createdProduct,
                success: true,
            }), 200);
        });
        this.productService = productService;
        this.getProducts = this.getProducts.bind(this);
        this.getProductById = this.getProductById.bind(this);
        this.addProduct = this.addProduct.bind(this);
    }
}
exports.ProductController = ProductController;
//  failedResponse(
//           "Une erreur s'est produite, veuillez réessayer plus tard !"
//         ),
//# sourceMappingURL=productController%20copy.js.map