import express from "express";
import { validate } from "../middleware/validate";
import {
  addUser,
  checkUser,
  checkYearUser,
  countUserByRole,
  deleteUser,
  findAllUsers,
  findByYear,
  findUserByAge,
  findUserByEmail,
  findUserByID,
  updatePassword,
  updateUser,
} from "../controllers/user.controller";
import {
  AddUserType,
  checkUserType,
  checkYearUserType,
  countUserByRoleType,
  deleteUserType,
  findByYearType,
  findUserByAgeType,
  findUserByEmailType,
  findUserByIDType,
  updatePasswordType,
  updateUserType,
} from "../zod.schema/zod.user";

const route = express.Router();

route.get("/", findAllUsers);
route.get("/findUserById", validate(findUserByIDType), findUserByID);
route.get("/findUserByEmail", validate(findUserByEmailType), findUserByEmail);
route.get("/findUserByAge", validate(findUserByAgeType), findUserByAge);
route.get("/countUserByRole", validate(countUserByRoleType), countUserByRole);
route.get("/checkUser", validate(checkUserType), checkUser);
route.get("/checkYearUser", validate(checkYearUserType), checkYearUser);
route.get("/findByYear", validate(findByYearType), findByYear);

route.post("/addUser", validate(AddUserType), addUser);
route.post("/updatePass", validate(updatePasswordType), updatePassword);

route.put("/updateUser", validate(updateUserType), updateUser);

route.delete("/deleteUser", validate(deleteUserType), deleteUser);

export default route;
