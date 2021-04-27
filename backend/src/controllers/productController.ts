import { Request, Response } from "express";
import { ProductService } from "../services";
import { IRequest } from "../types/types";
import { apiResponse, successResponse } from "../utils/response";
import { cloudinaryUpload } from "../utils/cloudinary-config";

export class ProductController {
  /**
   * @description productService
   * @type {ProductService}
   */
  private productService: ProductService;

  /**
   * @description Creates an instance of product controller.
   * @author Caleb Russel
   * @constructor
   * @param {ProductService} productService
   */
  public constructor(productService: ProductService) {
    this.productService = productService;
    this.getProducts = this.getProducts.bind(this);
    this.getProductsSortedByRating = this.getProductsSortedByRating.bind(this);
    this.getProductById = this.getProductById.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.addReview = this.addReview.bind(this);
  }

  /**
   * Get all the products stored at the db
   * @get
   * @async
   * @public
   */
  public getProducts = async (
    _req: Request,
    resp: Response
  ): Promise<Response> => {
    const products = await this.productService.getProducts();

    return apiResponse(
      resp,
      successResponse({
        msg: "Liste des produits",
        products: products,
        success: true,
      }),
      200
    );
  };
  /**
   * Get Products Sorted By top Rating
   * @get
   * @async
   * @public
   */
  public getProductsSortedByRating = async (
    _req: Request,
    resp: Response
  ): Promise<Response> => {
    const products = await this.productService.getProductsSortedByRating();
    return apiResponse(
      resp,
      successResponse({
        products: products,
        success: true,
      }),
      200
    );
  };

  /**
   * Get single product by id
   * @get
   * @async
   * @public
   */
  public getProductById = async (
    req: Request,
    resp: Response
  ): Promise<Response> => {
    const productId = req.params.productId;

    const product = await this.productService.getProductPopulatedById(
      productId
    );

    if (product) {
      return apiResponse(
        resp,
        successResponse({
          msg: "Information du produit selectionné",
          product: product,
          success: true,
        }),
        200
      );
    } else {
      resp.status(404);
      throw new Error("Ce produit n'existe pas.");
    }
  };
  /**
   * get Top Rated Product
   * @get
   * @async
   * @public
   */
  public getTopRatedProduct = async (
    _req: Request,
    resp: Response
  ): Promise<Response> => {
    const product = await this.productService.getProductsSortedByRating();

    if (product) {
      return apiResponse(
        resp,
        successResponse({
          msg: "Information du produit selectionné",
          product: product,
          success: true,
        }),
        200
      );
    } else {
      resp.status(404);
      throw new Error("Ce produit n'existe pas.");
    }
  };

  /**
   * delete single product by id
   * @delete
   * @async
   * @private/admin
   */
  public deleteProductById = async (
    req: Request,
    resp: Response
  ): Promise<Response> => {
    const productId = req.params.productId;

    const response = await this.productService.deleteProductById(productId);

    if (response) {
      return apiResponse(
        resp,
        successResponse({
          msg: "Le produit a bien été supprimé.",
          success: true,
        }),
        200
      );
    } else {
      resp.status(404);
      throw new Error("Ce produit n'existe pas.");
    }
  };

  /**
   * Create a new product on the db
   * @post
   * @async
   * @public
   */
  public addProduct = async (
    req: IRequest,
    resp: Response
  ): Promise<Response> => {
    const createdProduct = await this.productService.addProduct(
      req?.userData?._id
    );

    return apiResponse(
      resp,
      successResponse({
        msg: "Produit ajouté avec succès",
        createdProduct,
        success: true,
      }),
      201
    );
  };
  /**
   * Create a new review on the db
   * @post
   * @async
   * @private
   */
  public addReview = async (
    req: IRequest,
    resp: Response
  ): Promise<Response> => {
    const { rating, comment } = req.body;

    const productFound = await this.productService.getProductPopulatedById(
      req.params.productId
    );

    if (productFound) {
      const foundIfAlredyRevied = productFound.reviews?.find(
        (r) => r.user?.userId?.toString() === req.userData._id.toString()
      );

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
      const newReview = await this.productService.addReview(review);

      productFound.reviews?.push(newReview!);

      productFound.numReviews = productFound.reviews?.length!;

      productFound.rating = Number(
        productFound.reviews?.reduce(
          (accumulator, currentValue) => currentValue.rating + accumulator,
          0
        )! / productFound.reviews?.length!
      );

      await productFound?.save();

      return apiResponse(
        resp,
        successResponse({
          msg: "Commentaire ajouté avec succès.",
          createdReview: productFound,
          success: true,
        }),
        200
      );
    } else {
      resp.status(404);
      throw new Error("Ce produit n'existe pas.");
    }
  };

  /**
   * update existing product on the db
   * @put
   * @async
   * @private/admin
   */
  public updateProduct = async (
    req: IRequest,
    resp: Response
  ): Promise<Response> => {
    const productId = req.params.productId;
    const files = req.body?.image;

    const productFound = await this.productService.getProductById(productId);

    if (productFound) {
      if (files) {
        for (const file of files) {
          const newImg = await cloudinaryUpload(file);
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

      const updatedProduct = await productFound.save();

      return apiResponse(
        resp,
        successResponse({
          msg: "Informations du produit mis à jour.",
          updatedProduct,
          success: true,
        }),
        200
      );
    } else {
      resp.status(404);
      throw new Error("Produit non trouvé.");
    }
  };
}
