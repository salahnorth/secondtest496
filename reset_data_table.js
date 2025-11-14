const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
    process.exit(1);
  } else {
    console.log("Connected to database.db");
  }
});

db.serialize(() => {

  // Clear dependent tables first
  db.run("DELETE FROM availability");
  db.run("DELETE FROM item_genres");
  db.run("DELETE FROM ratings");
  db.run("DELETE FROM favourites");
  db.run("DELETE FROM reviews");

  // Then clear items and related content
  db.run("DELETE FROM movies");
  db.run("DELETE FROM books");
  db.run("DELETE FROM items");

  // Then clear user-related and lookup tables
  db.run("DELETE FROM users");
  db.run("DELETE FROM genres");
  db.run("DELETE FROM sources");

  // Reset autoincrement counters
  db.run("DELETE FROM sqlite_sequence WHERE name='users'");
  db.run("DELETE FROM sqlite_sequence WHERE name='favourites'");
  db.run("DELETE FROM sqlite_sequence WHERE name='ratings'");
  db.run("DELETE FROM sqlite_sequence WHERE name='movies'");
  db.run("DELETE FROM sqlite_sequence WHERE name='books'");
  db.run("DELETE FROM sqlite_sequence WHERE name='items'");

  console.log("All tables cleared and autoincrement reset.");
});

db.close();
