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

  // ---------------------- USERS ----------------------
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('bob@example.com', 'pass123', 26, 'M', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('carol@example.com', 'pass123', 22, 'F', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('dave@example.com', 'pass123', 28, 'M', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('eve@example.com', 'pass123', 23, 'F', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('frank@example.com', 'pass123', 25, 'M', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('grace@example.com', 'pass123', 21, 'F', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('heidi@example.com', 'pass123', 27, 'F', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('ivan@example.com', 'pass123', 29, 'M', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('judy@example.com', 'pass123', 22, 'F', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('kate@example.com', 'pass123', 30, 'F', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('leo@example.com', 'pass123', 23, 'M', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('mia@example.com', 'pass123', 24, 'F', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('nick@example.com', 'pass123', 28, 'M', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('olivia@example.com', 'pass123', 26, 'F', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('peter@example.com', 'pass123', 25, 'M', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('quinn@exmaple.com', 'pass123', 22, 'F', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('rachel@exmaple.com', 'pass123', 23, 'F', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('sam@example.com', 'pass123', 29, 'M', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('tina@example.com', 'pass123', 24, 'F', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('ursula@example.com', 'pass123', 26, 'F', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('victor@example.com', 'pass123', 27, 'M', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('wendy@exmaple.com', 'pass123', 23, 'F', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('xavier@example.com', 'pass123', 28, 'M', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('yvonne@example.com', 'pass123', 21, 'F', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('zach@exmaple.com', 'pass123', 25, 'M', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('amber@example.com', 'pass123', 22, 'F', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('brian@example.com', 'pass123', 27, 'M', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('cindy@exmaple.com', 'pass123', 23, 'F', datetime('now'))");
  db.run("INSERT INTO users (username, password, age, gender, created_at) VALUES ('derek@example.com', 'pass123', 28, 'M', datetime('now'))");

  console.log("30 users inserted with username, password, age, gender, and created_at.");

});

db.close();
