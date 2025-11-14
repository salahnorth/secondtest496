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
  db.run("PRAGMA foreign_keys = ON;");

  // ---------------------- FAVOURITES ----------------------
    db.run("INSERT INTO favourites (user_id, item_id) VALUES (1, 1)");
    db.run("INSERT INTO favourites (user_id, item_id) VALUES (2, 2)");
    db.run("INSERT INTO favourites (user_id, item_id) VALUES (3, 3)");
    db.run("INSERT INTO favourites (user_id, item_id) VALUES (4, 4)");
    db.run("INSERT INTO favourites (user_id, item_id) VALUES (5, 5)");
    db.run("INSERT INTO favourites (user_id, item_id) VALUES (6, 6)");
    db.run("INSERT INTO favourites (user_id, item_id) VALUES (7, 7)");
    db.run("INSERT INTO favourites (user_id, item_id) VALUES (8, 8)");
    db.run("INSERT INTO favourites (user_id, item_id) VALUES (9, 9)");
    db.run("INSERT INTO favourites (user_id, item_id) VALUES (10, 10)");

    console.log("10 user favourites inserted.");

});

db.close();
