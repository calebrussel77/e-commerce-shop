import { Request, Response } from "express";
import { UserService } from "../services";
import { apiResponse, successResponse } from "../utils/response";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { IRequest, ISignInCredentials } from "../types/types";
import jwt from "jsonwebtoken";

export class UserController {
  /**
   * @description productService
   * @type {ProductService}
   */
  private userService: UserService;

  /**
   * @description Creates an instance of product controller.
   * @author Caleb Russel
   * @constructor
   * @param {UserService} userService
   */
  public constructor(userService: UserService) {
    this.userService = userService;
    this.signInUser = this.signInUser.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.getUserProfile = this.getUserProfile.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.updateUserProfileInfo = this.updateUserProfileInfo.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUserById = this.deleteUserById.bind(this);
  }

  /**
   * POST login credentials
   * @post
   * @async
   * @public
   */
  public signInUser = async (req: Request, resp: Response) => {
    const errors = validationResult(req);
    const signInCredentials: ISignInCredentials = {
      email: req.body.email,
      password: req.body.password,
    };

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      resp.status(401);
      throw new Error(firstError);
    }
    const userFound = await this.userService.findUserByEmail(
      signInCredentials.email
    );

    if (!userFound) {
      resp.status(400);
      throw new Error("identifiants incorrect.");
    } else {
      const match = await bcrypt.compare(
        signInCredentials.password,
        String(userFound?.password)
      );

      if (!match) {
        resp.status(400);
        throw new Error("email et/ou mot de passe incorrecte(s)");
      } else {
        const payload = {
          _id: userFound._id,
          isAdmin: userFound.isAdmin,
        };
        const token = await jwt.sign(
          payload,
          String(process.env.JWT_SECRET_KEY),
          { expiresIn: "30d" }
        );

        return apiResponse(
          resp,
          successResponse({
            msg: `Ravie de vous revoir ${userFound.name}.`,
            userLoggedIn: {
              _id: userFound._id,
              isAdmin: userFound.isAdmin,
              image: userFound.image,
              email: userFound.email,
              name: userFound.name,
              website: userFound.website,
              state: userFound.state,
              city: userFound.city,
              zipCode: userFound.zipCode,
              token: token,
            },
            success: true,
          }),
          200
        );
      }
    }
  };

  /**
   * POST register credentials
   * @post
   * @async
   * @public
   */
  public registerUser = async (req: Request, resp: Response) => {
    const errors = validationResult(req);
    const registerCredentials = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      resp.status(422);
      throw new Error(firstError);
    }
    const userFound = await this.userService.findUserByEmail(
      registerCredentials.email
    );

    if (userFound) {
      resp.status(400);
      throw new Error("Cet utilisateur existe déjà.");
    } else {
      const newPassword = await bcrypt.hash(registerCredentials.password, 10);
      const userCreated = await this.userService.createNewUser({
        name: registerCredentials.name,
        email: registerCredentials.email,
        password: newPassword,
      });

      if (userCreated) {
        const payload = {
          _id: userCreated._id,
          isAdmin: userCreated.isAdmin,
        };
        const token = await jwt.sign(
          payload,
          String(process.env.JWT_SECRET_KEY),
          { expiresIn: "30d" }
        );

        return apiResponse(
          resp,
          successResponse({
            msg: `Bienvenue ${userCreated.name}.`,
            userRegistered: {
              _id: userCreated._id,
              isAdmin: userCreated.isAdmin,
              image: userCreated.image,
              email: userCreated.email,
              name: userCreated.name,
              website: userCreated.website,
              state: userCreated.state,
              city: userCreated.city,
              zipCode: userCreated.zipCode,
              token: token,
            },
            success: true,
          }),
          200
        );
      } else {
        resp.status(400);
        throw new Error("Données de l'utilisateur invalide.");
      }
    }
  };

  /**
   * GET all users
   * @get
   * @async
   * @private/Admin
   */
  public getAllUsers = async (_req: IRequest, resp: Response) => {
    const users = await this.userService.findAllUsers();

    return apiResponse(
      resp,
      successResponse({
        msg: "Tous les utilisateurs",
        userList: users,
        success: true,
      }),
      200
    );
  };
  /**
   * GET user data by id
   * @get
   * @async
   * @private/Admin
   */
  public getUserById = async (req: IRequest, resp: Response) => {
    const user = await this.userService.findUserById(req?.params?.id);

    if (user) {
      return apiResponse(
        resp,
        successResponse({
          user: user,
          success: true,
        }),
        200
      );
    } else {
      resp.status(404);
      throw new Error("Utilisateur non trouvé.");
    }
  };

  /**
   * UPDATE single user infos
   * @put
   * @async
   * @private/admin
   */
  public updateUser = async (req: IRequest, resp: Response) => {
    const userInfo = await this.userService.findUserById(req?.params?.id);

    if (userInfo) {
      userInfo.name = req.body.name || userInfo.name;
      userInfo.email = req.body.email || userInfo.email;
      userInfo.isAdmin = req.body.isAdmin;

      await userInfo.save();

      return apiResponse(
        resp,
        successResponse({
          msg: "Informations de l'utilisateur mis à jour.",
          success: true,
        }),
        200
      );
    } else {
      resp.status(404);
      throw new Error("Utilisateur non trouvé.");
    }
  };

  /**
   * DELETE user
   * @delete
   * @async
   * @private/Admin
   */
  public deleteUserById = async (req: IRequest, resp: Response) => {
    const userId = req.params.userId;

    const response = await this.userService.deleteUserById(userId);

    if (response) {
      return apiResponse(
        resp,
        successResponse({
          msg: "L'utilisateur a bien été supprimé.",
          success: true,
        }),
        200
      );
    } else {
      return;
    }
  };

  /**
   * GET user profile infos
   * @get
   * @async
   * @private
   */
  public getUserProfile = async (req: IRequest, resp: Response) => {
    const userInfo = await this.userService.findUserById(req?.userData?._id);
    if (userInfo) {
      return apiResponse(
        resp,
        successResponse({
          msg: "Information de l'utilisateur",
          userProfile: userInfo,
          success: true,
        }),
        200
      );
    } else {
      resp.status(404);
      throw new Error("Utilisateur non trouvé.");
    }
  };

  /**
   * UPDATE user profile infos
   * @put
   * @async
   * @private
   */
  public updateUserProfileInfo = async (req: IRequest, resp: Response) => {
    const userInfo = await this.userService.findUserById(req?.userData?._id);

    if (userInfo) {
      userInfo.name = req.body.name || userInfo.name;
      userInfo.email = req.body.email || userInfo.email;
      userInfo.city = req.body.city || userInfo.city;
      userInfo.state = req.body.state || userInfo.state;
      userInfo.zipCode = req.body.zipCode || userInfo.zipCode;
      userInfo.website = req.body.website || userInfo.website;
      userInfo.image = req.body.image || userInfo.image;

      if (req.body.password) {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        userInfo.password = newPassword;
      }
      const updatedProfile = await userInfo.save();

      return apiResponse(
        resp,
        successResponse({
          msg: "Vos informations ont bien été mis à jour.",
          updatedProfile: {
            _id: updatedProfile._id,
            image: updatedProfile.image,
            email: updatedProfile.email,
            name: updatedProfile.name,
            website: updatedProfile.website,
            state: updatedProfile.state,
            city: updatedProfile.city,
            zipCode: updatedProfile.zipCode,
          },
          success: true,
        }),
        200
      );
    } else {
      resp.status(404);
      throw new Error("Utilisateur non trouvé.");
    }
  };
}
