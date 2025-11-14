const axios = require("axios");
const sqlite3 = require("sqlite3").verbose();

const API_KEY = "66c2dc1512msh0b54032f5cf514bp15affcjsn12fd4d6e4b3b";
const db = new sqlite3.Database("./database.db");

function runQuery(sql) {
  return new Promise((resolve, reject) => {
    db.run(sql, function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
}

async function importCanadianMovies() {
  try {
    console.log("Fetching Canadian movies from Streaming Availability API...");

    const options = {
      method: "GET",
      url: "https://streaming-availability.p.rapidapi.com/shows/search/filters",
      params: {
        country: "ca",
        services: "netflix,disney",
        show_type: "movie",
        output_language: "en",
      },
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    const movies = response.data.shows || [];
    console.log("Movies found:", movies.length);

    for (const movie of movies) {
      const title = movie.title ? movie.title.replace(/'/g, "''") : "Untitled";
      const description = movie.overview ? movie.overview.replace(/'/g, "''") : "";
      const release_year = movie.year ? movie.year.toString() : "";
      const rating = movie.imdbRating || 0;
      const last_checked = new Date().toISOString();

      // Safely extract image (verticalPoster or horizontalPoster)
      const image_url =
        movie.imageSet?.verticalPoster?.w500 ||
        movie.imageSet?.horizontalPoster?.w500 ||
        null;

      const sqlItems = `
        INSERT INTO items (title, release_year, description, rating, image_url, type)
        VALUES ('${title}', '${release_year}', '${description}', '${rating}', '${image_url}', 'movie')
      `;
      const itemId = await runQuery(sqlItems);

      const sqlMovies = `
        INSERT INTO movies (item_id, title, release_year, description, rating, image_url, last_checked)
        VALUES ('${itemId}', '${title}', '${release_year}', '${description}', '${rating}', '${image_url}', '${last_checked}')
      `;
      await runQuery(sqlMovies);

      console.log(`Added: ${title}`);
    }

    console.log("All Canadian movies imported successfully!");
    db.close();
  } catch (err) {
    console.error("Error importing movies:", err.response?.data || err.message);
    db.close();
  }
}

importCanadianMovies();
