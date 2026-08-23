import { Router } from "express";

import db from "../db/database.js";
import { interpretDream } from "../services/openai.js";

import type { Dream } from "../types/dream.ts"

const router = Router();

router.get("/", (_req, res) => {
  try {
    const statement = db.prepare(`
      SELECT
        id,
        dream_text,
        interpretation,
        created_at
      FROM dreams
      ORDER BY id DESC
    `);

    const dreams = statement.all() as Dream[];

    return res.json(dreams);
  } catch (error) {
    console.error("Failed to fetch dreams:", error);

    return res.status(500).json({
      error: "Failed to fetch dreams",
    });
  }
});

router.post("/", async (req, res) => {
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

    const cleanedDream = dream_text.trim();

    const interpretation = await interpretDream(
      cleanedDream
    );

    const createdAt = new Date().toISOString();

    const statement = db.prepare(`
      INSERT INTO dreams (
        dream_text,
        interpretation,
        created_at
      )
      VALUES (?, ?, ?)
    `);

    const result = statement.run(
      cleanedDream,
      interpretation,
      createdAt
    );

    const newDream: Dream = {
      id: Number(result.lastInsertRowid),
      dream_text: cleanedDream,
      interpretation,
      created_at: createdAt,
    };

    return res.status(201).json(newDream);
  } catch (error) {
    console.error("Failed to create dream:", error);

    return res.status(500).json({
      error: "Failed to interpret dream",
    });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "Invalid dream ID",
      });
    }

    const statement = db.prepare(`
      DELETE FROM dreams
      WHERE id = ?
    `);

    const result = statement.run(id);

    if (result.changes === 0) {
      return res.status(404).json({
        error: "Dream not found",
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error("Failed to delete dream:", error);

    return res.status(500).json({
      error: "Failed to delete dream",
    });
  }
});

export default router;