import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import produtRoutes from "./routes/productRoutes.js";
import mongoose from "mongoose";

dotenv.config();

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGO_URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("connect to MongoDB");
  }
);

const app = express();

app.get("/", (req, res) => {
  res.send("api running");
});

app.use("/api/products", produtRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`running on ${PORT} and in ${process.env.NODE_ENV}`)
);
