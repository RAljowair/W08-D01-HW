import { prisma } from "../config/db";
import { Response, Request } from "express";
import { Genre } from "@prisma/client";

// function to get all movies
export const findAllMovies = async (req: Request, res: Response) => {
  const id = req.body.id;
  try {
    const movies = await prisma.movie.findMany({
      where: { id },
    });
    res.json(movies);
  } catch (error) {
    res.json(error);
  }
};

// function to add new movie
export const addMovie = async (req: Request, res: Response) => {
  const name = req.body.name;
  const genre: Genre = req.body.genre.toLocaleLowerCase();
  const rating = req.body.rating;
  const duration = req.body.duration;
  try {
    const movies = await prisma.movie.create({
      data: {
        name,
        genre,
        rating,
        duration,
      },
    });
    res.json(movies);
  } catch (error) {
    res.json(error + "");
  }
};

// function to update new movie
export const updateMovie = async (req: Request, res: Response) => {
  const { id } = req.body;
  const name = req.body.name;
  const genre = req.body.genre;
  const rating = req.body.rating;
  const duration = req.body.duration;
  try {
    const updatedMovie = await prisma.movie.update({
      where: {
        id,
      },
      data: {
        name,
        genre,
        rating,
        duration,
      },
    });
    res.json(updatedMovie);
  } catch (error) {
    res.json(error);
  }
};

// function to delete movie
export const deleteMovie = async (req: Request, res: Response) => {
  const id = req.body.id;
  try {
    const deletedMovie = await prisma.movie.delete({
      where: {
        id,
      },
    });
    res.json(deletedMovie);
  } catch (error) {
    res.json(error);
  }
};

// function to get movie by name
export const searchMovie = async (req: Request, res: Response) => {
  const name = req.body.name;
  try {
    const foundMovie = await prisma.movie.findFirst({
      where: {
        name,
      },
    });
    res.json(foundMovie);
  } catch (error) {
    res.json(error);
  }
};

// Get movie with specific genre
export const genreMovie = async (req: Request, res: Response) => {
  const genre = req.body.genre;
  try {
    const foundMovie = await prisma.movie.findMany({
      where: {
        genre,
      },
    });
    res.json(foundMovie);
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
