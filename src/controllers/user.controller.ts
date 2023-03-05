import { prisma } from "../config/db";
import { Response, Request } from "express";
import { user_role } from "@prisma/client";

// function to get all movies
export const findAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
};

// function to add new movie
export const addUser = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const age = req.body.age;
  const role: user_role = req.body.role;
  const joning_year = req.body.joning_year;

  try {
    const addedUser = await prisma.user.create({
      data: {
        username,
        password,
        email,
        age,
        role,
        joning_year,
      },
    });
    res.json("User Added Successfully ✅");
  } catch (error) {
    res.json(error);
  }
};

// function to update new movie
export const updateUser = async (req: Request, res: Response) => {
  const id = req.body.params;
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const age = req.body.age;
  const role: user_role = req.body.role;
  const joning_year = req.body.joining_year;
  try {
    const updatedMovie = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        password,
        email,
        age,
        role,
        joning_year,
      },
    });
    res.json(updatedMovie);
  } catch (error) {
    res.json(error);
  }
};

// function to delete movie
export const deleteUser = async (req: Request, res: Response) => {
  const id = req.body.id;
  try {
    const deletedMovie = await prisma.user.delete({
      where: {
        id,
      },
    });
    res.json(deletedMovie);
  } catch (error) {
    res.json(error);
  }
};

// function to get user by ID
export const findUserByID = async (req: Request, res: Response) => {
  const id = req.body.id;
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    foundUser == null
      ? res.json(`No user with this id: '${id}'`)
      : res.json(foundUser);
  } catch (error) {
    res.json(error);
  }
};

// function to get user by Email
export const findUserByEmail = async (req: Request, res: Response) => {
  const email = req.body.email;
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    foundUser == null
      ? res.json(`Sorry, there is No user with this email: '${email}'`)
      : res.json(foundUser);
  } catch (error) {
    res.json(error);
  }
};

export const findUserByAge = async (req: Request, res: Response) => {
  const age = req.body.age;
  try {
    const foundUser = await prisma.user.findMany({
      where: {
        age: {
          gte: age,
        },
      },
    });
    foundUser == null
      ? res.json(`Sorry, there is No user with age: '${age}'
      try age older than 16`)
      : res.json(foundUser);
  } catch (error) {
    res.json(error);
  }
};

export const checkUser = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        username,
        password,
      },
    });
    res.json(
      foundUser == null ? "User not found" : `Welcome ${foundUser.username}`
    );
  } catch (error) {
    res.json(error);
  }
};

export const checkYearUser = async (req: Request, res: Response) => {
  const id: string = req.body.id;
  const joning_year: string = req.body.joning_year;
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (foundUser != null) {
      res.json(
        foundUser.joning_year == joning_year
          ? `Yes, ${foundUser.username} has joined in ${joning_year}`
          : `No, ${foundUser.username} has not joined in ${joning_year}`
      );
    } else {
      res.json(`No user found with id ${id}`);
    }
  } catch (error) {
    res.json(error);
  }
};

export const findByYear = async (req: Request, res: Response) => {
  const joning_year: string = req.body.joning_year;
  try {
    const foundUsers = await prisma.user.findMany({
      where: {
        joning_year,
      },
    });
    res.json(foundUsers);
  } catch (error) {
    res.json(error);
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  const id = req.body.id;
  const password = req.body.password;
  try {
    const foundUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: password,
      },
    });
    res.json(
      foundUser == null
        ? "User not found"
        : `${foundUser.username} Password Changed Successfully ✅`
    );
  } catch (error) {
    res.json(error);
  }
};

export const countUserByRole = async (req: Request, res: Response) => {
  const role = req.body.role;

  try {
    const userCount = await prisma.user.count({
      where: {
        role,
      },
    });
    const areOris = userCount > 1 ? "are" : "is";
    const sOrNo = userCount > 1 ? "s" : "";
    userCount == null
      ? res.json(`Sorry, there is No users with this: '${role}'`)
      : res.json(
          `Number of user${sOrNo} with role '${role}' ${areOris}: ${userCount}`
        );
  } catch (error) {
    res.json(error);
  }
};

// function to Sort movies by its rate
export const ratingSort = async (req: Request, res: Response) => {
  const selectdRating = req.body.rating;
  try {
    const foundMovie = await prisma.movie.findMany({
      where: {
        rating: {
          gt: selectdRating,
        },
      },
    });
    res.json(foundMovie);
  } catch (error) {
    res.json(error);
  }
};
