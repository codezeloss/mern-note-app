import app from "./app";
import env from "./utils/validateEnv";
import mongoose from "mongoose";

const PORT = env.PORT || 3000;

// connect MongoDB + listen to server
mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose connected!");
    app.listen(PORT, () => {
      console.log("::: Server running on port: " + PORT);
    });
  })
  .catch(console.error);
