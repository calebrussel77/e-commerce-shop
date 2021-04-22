import User, { IUser } from "../models/user";

/**
 * UserService class handles the logic needed to work with the user data.
 * @class
 * @public
 * @author Caleb russel
 */
export class UserService {
  /**
   * Creates an instance of user service.
   * @author Caleb russel
   */
  public constructor() {
    this.findUserByEmail = this.findUserByEmail.bind(this);
    this.findUserById = this.findUserById.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
    this.findAllUsers = this.findAllUsers.bind(this);
    this.deleteUserById = this.deleteUserById.bind(this);
  }

  public findUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).then((result) => result);
  }

  public findAllUsers(): Promise<IUser[] | []> {
    return User.find().then((result) => result);
  }

  public deleteUserById(userId: string): Promise<any> {
    return User.findByIdAndRemove(userId).then((result) => result);
  }

  public findUserById(id: string): Promise<IUser | null> {
    return User.findById(id)
      .select("-password")
      .then((result) => result);
  }

  public createNewUser(user: Partial<IUser>): Promise<IUser | null> {
    const userCreated = new User(user);

    return userCreated.save().then((result: IUser) => result);
  }
}
