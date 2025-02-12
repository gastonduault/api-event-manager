import express from "express";
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

app.use("/api", eventRoutes);
app.use("/api", userRoutes);
app.use("/api", typeRoutes);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
