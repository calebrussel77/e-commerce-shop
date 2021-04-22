import bcrypt from "bcrypt";
// import { IUser } from "../models/user";

const users = [
  {
    name: "Caleb Russel",
    email: "calebrussel@fr.fr",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@fr.fr",
    city: "Freemont street",
    state: "Californie",
    zipCode: "2345 Las vegas",
    website: "johndoe.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    email: "jane@fr.fr",
    city: "Freemont street",
    state: "Californie",
    zipCode: "2345 Las vegas",
    website: "janedoe.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
