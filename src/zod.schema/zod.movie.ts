import { TypeOf, z } from "zod";

const movieObj = z.object({
  id: z.string({
    required_error: "id name is required",
  }),
  name: z
    .string({
      required_error: "name is required",
      invalid_type_error: "name only acceptes text",
    })
    .min(2, "name is too short"),
  genre: z.enum(["action", "comedy", "drama"]),
  rating: z
    .number({
      required_error: "rating is required",
      invalid_type_error: "rating only acceptes number",
    })
    .min(1, "minimum number is 1")
    .max(5, "maximum number is 5"),
  duration: z
    .number({
      required_error: "duration is required",
      invalid_type_error: "duration only acceptes number",
    })
    .min(60, "minmum is 60, and must be in minutes")
    .max(300, "max is 300, and must be in minutes"),
});

export const AddMovieType = z.object({
  body: movieObj.omit({ id: true }),
});

export const updateMovieType = z.object({
  body: movieObj.omit({ id: true }),
});

export const deleteMovieType = z.object({
  body: movieObj.pick({ id: true }),
});

export const searchMovieType = z.object({
  body: movieObj.pick({ name: true }),
});

export const genreMovieType = z.object({
  body: movieObj.pick({ genre: true }),
});

export const sortMovieType = z.object({
  body: movieObj.pick({ rating: true }),
});

export type AddMovieTypeschema = TypeOf<typeof AddMovieType>["body"];
export type updateMovieTypeschema = TypeOf<typeof updateMovieType>["body"];
export type deleteMovieTypeschema = TypeOf<typeof deleteMovieType>["body"];
export type searchMovieTypeschema = TypeOf<typeof searchMovieType>["body"];
export type genreMovieTypeschema = TypeOf<typeof genreMovieType>["body"];
export type sortMovieTypeschema = TypeOf<typeof sortMovieType>["body"];
