import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { interpretDream } from "./services/openai.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

interface Dream {
  id: number;
  dream_text: string;
  interpretation: string;
  created_at: string;
}

let dreams: Dream[] = [];

app.get("/", (_req, res) => {
  res.json({
    message: "DreamCatcher API is running",
  });
});

app.get("/api/dreams", (_req, res) => {
  res.json(dreams);
});

app.post("/api/dreams", async (req, res) => {
  try {
    const { dream_text } = req.body;

    if (
      typeof dream_text !== "string" ||
      !dream_text.trim()
    ) {
      return res.status(400).json({
        error: "Dream text is required",
      });
    }

    const interpretation = await interpretDream(
      dream_text.trim()
    );

    const newDream: Dream = {
      id: Date.now(),

      dream_text: dream_text.trim(),

      interpretation,

      created_at: new Date().toISOString(),
    };

    dreams.unshift(newDream);

    res.status(201).json(newDream);
  } catch (error) {
    console.error(
      "Dream interpretation error:",
      error
    );

    res.status(500).json({
      error:
        "Failed to interpret your dream. Please try again.",
    });
  }
});

app.delete("/api/dreams/:id", (req, res) => {
  const id = Number(req.params.id);

  dreams = dreams.filter(
    (dream) => dream.id !== id
  );

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});