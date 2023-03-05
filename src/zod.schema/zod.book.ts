import { TypeOf, z } from "zod";

const bookObj = z.object({
  id: z.string({
    required_error: "id is required",
  }),
  name: z
    .string({
      required_error: "name is required",
      invalid_type_error: "name only acceptes text",
    })
    .min(2, "name is too short"),
  genre: z.enum(["action", "comedy", "drama"]),
});

const loanObj = z.object({
  id: z.string({
    required_error: "id is required",
  }),
  user_id: z.string({
    required_error: "'user_id' is required",
    invalid_type_error: "'user_id' only acceptes string",
  }),
  book_id: z.string({
    required_error: "'book_id' is required",
    invalid_type_error: "'book_id' only acceptes string",
  }),
});

export const addBookType = z.object({
  body: bookObj.omit({ id: true }),
});

export const addLoanType = z.object({
  body: loanObj.omit({ id: true }),
});

export type AddUserTypeschema = TypeOf<typeof addBookType>["body"];
export type addLoanTypeschema = TypeOf<typeof addLoanType>["body"];
