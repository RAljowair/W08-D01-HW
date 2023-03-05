import { date, TypeOf, z } from "zod";

const userObj = z.object({
  id: z.string({
    required_error: "id is required",
  }),
  username: z
    .string({
      required_error: "username is required",
      invalid_type_error: "username only acceptes text",
    })
    .min(2, "name is too short"),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password only acceptes number",
    })
    .min(8, "password should be more than 8 digits"),
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email only acceptes text",
    })
    .email("You should enter correct email"),
  role: z.enum(["admin", "user"]),
  age: z
    .number({
      invalid_type_error: "age only acceptes number",
    })
    .min(16, "Sorry, you should be older than 16 years"),
  joning_year: z
    .string({
      required_error: "'joning_year' atribute is required in fomat YYYY",
      invalid_type_error: "Joining year only acceptes this date format YYYY",
    })
    .min(4, "Joining year must contain 4 character(s) in this year format YYYY")
    .max(
      4,
      "Joining year must contain 4 character(s) in this year format YYYY"
    ),
});

export const AddUserType = z.object({
  body: userObj.omit({ id: true }),
});

export const updateUserType = z.object({
  body: userObj.omit({ id: true }),
});

export const deleteUserType = z.object({
  body: userObj.pick({ id: true }),
});

export const findUserByIDType = z.object({
  body: userObj.pick({ id: true }),
});

export const findUserByEmailType = z.object({
  body: userObj.pick({ email: true }),
});

export const findUserByAgeType = z.object({
  body: userObj.pick({ age: true }),
});

export const checkUserType = z.object({
  body: userObj.pick({ username: true, password: true }),
});

export const checkYearUserType = z.object({
  body: userObj.pick({ id: true, joning_year: true }),
});

export const findByYearType = z.object({
  body: userObj.pick({ joning_year: true }),
});

export const updatePasswordType = z.object({
  body: userObj.pick({ id: true, password: true }),
});

export const countUserByRoleType = z.object({
  body: userObj.pick({ role: true }),
});

export type AddUserTypeschema = TypeOf<typeof AddUserType>["body"];
export type updateUserTypeschema = TypeOf<typeof updateUserType>["body"];
export type deleteUserTypeschema = TypeOf<typeof deleteUserType>["body"];
export type findUserByIDTypeschema = TypeOf<typeof findUserByIDType>["body"];
export type findUserByEmailTypeschema = TypeOf<
  typeof findUserByEmailType
>["body"];
export type findUserByAgeTypeschema = TypeOf<typeof findUserByAgeType>["body"];
export type checkUserTypeschema = TypeOf<typeof checkUserType>["body"];
export type checkYearUserTypeschema = TypeOf<typeof checkYearUserType>["body"];
export type findByYearTypeschema = TypeOf<typeof findByYearType>["body"];
export type countUserByRoleTypeschema = TypeOf<
  typeof countUserByRoleType
>["body"];
export type updatePasswordTypeschema = TypeOf<
  typeof updatePasswordType
>["body"];

