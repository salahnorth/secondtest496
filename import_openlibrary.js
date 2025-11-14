const axios = require("axios");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db");

// Simple helper to run queries with async/await
function runQuery(sql) {
  return new Promise((resolve, reject) => {
    db.run(sql, function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
}

// Main import function
async function importOLCanadianBooks() {
  try {
    console.log("Fetching Canadian books from Open Library...");

    const MAX_RESULTS = 20;
    const MAX_PAGES = 5;

    for (let page = 1; page <= MAX_PAGES; page++) {
      // Open Library search API: https://openlibrary.org/dev/docs/api/search
      const url = `https://openlibrary.org/search.json?q=canada&limit=${MAX_RESULTS}&page=${page}`;
      const response = await axios.get(url);
      const books = response.data.docs || [];

      for (const book of books) {
        // Extract metadata safely
        const title = book.title ? book.title.replace(/'/g, "''") : "Untitled";
        const authors = book.author_name ? book.author_name.join(", ").replace(/'/g, "''") : "";
        const description = book.first_sentence ? book.first_sentence.join(" ") : "";
        const published_date = book.first_publish_year || "";
        const last_checked = new Date().toISOString();

        // Insert into items table
        const sqlItems = `
          INSERT INTO items (title, release_year, description, rating, image_url, type)
          VALUES ('${title}', '${published_date}', '${description}', 0, NULL, 'book')
        `;
        const itemId = await runQuery(sqlItems);

        // Insert into books table
        const sqlBooks = `
          INSERT INTO books (item_id, title, authors, description, published_date, rating, genre, page_count, image_url, last_checked)
          VALUES ('${itemId}', '${title}', '${authors}', '${description}', '${published_date}', 0, '', 0, NULL, '${last_checked}')
        `;
        await runQuery(sqlBooks);

        console.log(`Added: ${title}`);
      }
    }

    console.log("All Canadian books imported safely!");
    db.close();
  } catch (err) {
    console.error("Error importing books:", err.message);
    db.close();
  }
}

importOLCanadianBooks();
