import { prisma } from "../config/db";
import { Response, Request } from "express";

// get all books
export const findAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany();
    res.send(books);
  } catch (error) {
    res.send(error);
  }
};

// find all lend books
export const findAllLoans = async (req: Request, res: Response) => {
  try {
    const loans = await prisma.loan.findMany();
    res.send(loans);
  } catch (error) {
    res.send(error);
  }
};

// add new book
export const addBook = async (req: Request, res: Response) => {
  const name = req.body.name;
  const genre = req.body.genre;

  try {
    const addedBook = await prisma.book.create({
      data: {
        name,
        genre,
      },
    });
    res.json("Book Added Successfully ✅");
  } catch (error) {
    res.json(error);
  }
};

// add loan relation
export const addLoan = async (req: Request, res: Response) => {
  const user_id = req.body.user_id;
  const book_id = req.body.book_id;

  try {
    const book = await prisma.book.findFirst({
      where: {
        id: book_id,
      },
    });
    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
    });
    const addedloan = await prisma.loan.create({
      data: {
        user_id,
        book_id,
      },
    });
    if (user == null || book == null) {
      res.json(
        user == undefined ? "'user_id' is invalid" : "'book_id' is invalid"
      );
    }
    res.json(`${user?.username} Lend ${book?.name} Successfully ✅`);
  } catch (error) {
    res.json(error);
  }
};


