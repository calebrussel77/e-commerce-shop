import Product, { IProduct } from "../models/product";
import Reviews from "../models/reviews";
import { IReview } from "../models/reviews";

/**
 * ProductService class handles the logic needed to work with the product data.
 * @class
 * @public
 * @author Caleb russel
 */
export class ProductService {
  /**
   * Creates an instance of product service.
   * @author Caleb russel
   */
  public constructor() {
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
  public getProducts(): Promise<IProduct[] | []> {
    return Product.find().then((result) => result);
  }
  /**
   * get all top products sorted by rating
   * @public
   * @method {getProductsSortedByRating}
   * @author Caleb russel
   * @returns {Promise<IProduct[]>} products array
   */
  public getProductsSortedByRating(): Promise<IProduct[] | []> {
    return Product.find()
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
  public deleteProductById(productId: string): Promise<any> {
    return Product.findByIdAndRemove(productId).then((result) => result);
  }

  /**
   * get single product
   * @public
   * @method {getProductById}
   * @author Caleb russel
   * @returns {Promise<IProduct | null>} single product informations
   */
  public getProductById(productId: string): Promise<IProduct | null> {
    return Product.findById(productId).then((result) => result);
  }

  /**
   * get single product
   * @public
   * @method {getProductById}
   * @author Caleb russel
   * @returns {Promise<IProduct | null>} single product informations
   */
  public getProductPopulatedById(productId: string): Promise<IProduct | null> {
    return Product.findById(productId)
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
  public addReview(review: Partial<IReview>): Promise<IReview | null> {
    let newReview = new Reviews(review);
    return newReview.save();
  }

  /**
   * create a new product
   * @public
   * @method {addProduct}
   * @author Caleb russel
   * @returns {Promise<IProduct | null>}
   */
  public addProduct(userId: string): Promise<IProduct | null> {
    const newProduct = new Product({
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
