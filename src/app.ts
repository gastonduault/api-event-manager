import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
const prisma = new PrismaClient();
const SECRET_KEY = "secret_key";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  res.send("Post work");
});

app.listen(port, () => {
  console.log(`Express is caca listening at http://localhost:${port}`);
});
