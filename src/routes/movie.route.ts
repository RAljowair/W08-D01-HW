import express from "express";
import { validate } from "../middleware/validate";
import {
  addMovie,
  deleteMovie,
  findAllMovies,
  genreMovie,
  ratingSort,
  searchMovie,
  updateMovie,
} from "../controllers/movie.controller";
import {
  AddMovieType,
  deleteMovieType,
  genreMovieType,
  searchMovieType,
  sortMovieType,
  updateMovieType,
} from "../zod.schema/zod.movie";

const route = express.Router();

route.get("/", findAllMovies);
route.get("/searchMovie", validate(searchMovieType), searchMovie);
route.get("/sortMovie", validate(sortMovieType), ratingSort);
route.get("/genreMovie", validate(genreMovieType), genreMovie);

route.post("/addMovie", validate(AddMovieType), addMovie);

route.put("/updateMovie", validate(updateMovieType), updateMovie);

route.delete("/deleteMovie", validate(deleteMovieType), deleteMovie);

export default route;
