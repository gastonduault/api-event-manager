import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
const prisma = new PrismaClient();
const SECRET_KEY = "secret_key";
import setupSwagger from "./swaggerConfig";
import eventRoutes from "./routes/events";
import userRoutes from "./routes/users";
import typeRoutes from "./routes/types";
const app = express();
const port = 3000;

setupSwagger(app);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  res.send("Post work");
});

app.use("/api", eventRoutes);
app.use("/api", userRoutes);
app.use("/api", typeRoutes);

app.listen(port, () => {
  console.log(`Express is caca listening at http://localhost:${port}`);
});
