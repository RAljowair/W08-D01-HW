import express from "express";
import { validate } from "../middleware/validate";
import {
  addBook,
  addLoan,
  findAllBooks,
  findAllLoans,
} from "../controllers/book.controller";
import { addBookType, addLoanType } from "../zod.schema/zod.book";

const route = express.Router();

route.get("/", findAllBooks);
route.get("/loans", findAllLoans);
route.post("/loans/add", validate(addLoanType), addLoan);
route.post("/addBook", validate(addBookType), addBook);

export default route;
