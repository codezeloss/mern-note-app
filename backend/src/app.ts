import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notesRoutes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
// import bodyParser from "body-parser";


const app = express();
app.use(morgan("dev"));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// Routes
app.use("/api/notes", notesRoutes);

// !! Middleware for errors
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error;
  let statusCode = 500;
  let errorMessage = "An unknown error occurred";

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
