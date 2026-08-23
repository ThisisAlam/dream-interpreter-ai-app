import Database from "better-sqlite3";

const db: any = new Database("dreamcatcher.db");

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS dreams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dream_text TEXT NOT NULL,
    interpretation TEXT NOT NULL,
    created_at TEXT NOT NULL
  )
`);

export default db;