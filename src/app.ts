import express, { Application } from "express";
import movieRoute from "./routes/movie.route";
import userRoute from "./routes/user.route";
import bookRoute from "./routes/book.route";
import { connectDB } from "./config/db";

const app: Application = express();
const port: number = 3309;

connectDB();

app.use(express.json());
app.use("/movies", movieRoute);
app.use("/users", userRoute);
app.use("/books", bookRoute);

app.listen(port, () => {
  console.log(`Express running on port:${port}`);
});
