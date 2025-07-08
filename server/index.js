// // server/index.js

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const path = require("path");

const app = express();
const PORT = 5050;

// Middleware
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000"
}));

// // Middleware to parse JSON requests
app.use(express.json());


// // PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "notes_app",
  password: "Verdeesmeralda1995",
  port: 5432, // ⚠️ Make sure this port is correct
});

// API Routes
app.get("/notes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM notes ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("GET /notes error:", err);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

app.post("/notes", async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /notes error:", err);
    res.status(500).json({ error: "Failed to save note" });
  }
});

// this is a method provided by express framework to define a route handler for HTTP PUT requests
// it takes a path parameter :id which is used to identify the specific note to be updated
// it updates the title and content of the note with the specified ID
// if the title or content is missing, it returns a 400 Bad Request error
// if the update is successful, it returns the updated note as a JSON response
app.put("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  //if the title or content is missing, return a 400 Bad Request error
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content required" });
  }

  // update the note with the specified ID
  try {
    const result = await pool.query(
      "UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *",
      [title, content, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT /notes error:", err);
    res.status(500).json({ error: "Failed to update note" });
  }
});


// this is a method provided by express framework to define a route handler for HTTP DELETE requests
// it takes a path parameter :id which is used to identify the specific note to be deleted
app.delete("/notes/:id", async (req, res) => {
  // Parse the note ID from the request parameters
  // req.params.id contains the ID of the note to be deleted
  // parseInt is used to convert the string ID to an integer
  const id = parseInt(req.params.id);
  try {
    // Execute a SQL DELETE query to remove the note with the specified ID
    const result = await pool.query("DELETE FROM notes WHERE id = $1 RETURNING *", [id]);

    // if there are no rows, it means the note with the specified ID was not found
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Respond with a success message and the deleted note data
    res.json({ message: "Note deleted", deletedNote: result.rows[0] });
  } catch (err) {

    console.error("DELETE /notes/:id error:", err);
    res.status(500).json({ error: "Failed to delete note" });
  }
});


// // Sample route (for testing)
app.get("/notes", (req, res) => {
  res.json([{ title: "Dream", content: "Flying" }]);
});


app.listen(5050, () => {
  console.log("Server is running on http://localhost:5050");
});

