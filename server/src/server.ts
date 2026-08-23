import "dotenv/config";

import express from "express";
import cors from "cors";

import dreamRoutes from "./routes/dreams.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "DreamCatcher API is running",
  });
});

app.use("/api/dreams", dreamRoutes);

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});