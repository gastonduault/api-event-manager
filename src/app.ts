import express from "express";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import setupSwagger from "./swaggerConfig";
import eventRoutes from "./routes/events.route";
import userRoutes from "./routes/users.route";
import typeRoutes from "./routes/types.route";

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

// routes
app.use("/api", eventRoutes);
app.use("/api", userRoutes);
app.use("/api", typeRoutes);

// middlewares
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
