import puppeteer from "puppeteer";

async function scrapeIMDB() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const url = "https://www.imdb.com/chart/moviemeter/";
  await page.goto(url);

  await page.waitForSelector(".ipc-metadata-list-summary-item"); 

  const movies = await page.evaluate(() => {
    const movieItems = document.querySelectorAll(".ipc-metadata-list-summary-item");
    const results = [];

    movieItems.forEach((movie) => {
      const titleElement = movie.querySelector(".ipc-title__text.ipc-title__text--reduced");
      const yearElement = movie.querySelector(".sc-15ac7568-7.cCsint.cli-title-metadata-item");
      const ratingElement = movie.querySelector(".ipc-rating-star--rating");

      let title = "Unknown";
      let year = "Unknown";
      let rating = "Unknown";

      if (titleElement)
        title = titleElement.textContent;

      if (yearElement)
        year = yearElement.textContent;

      if (ratingElement)
        rating = ratingElement.textContent;

      results.push({ title, year, rating });
    });

    return results;
  });

  console.log("Scraped movies:");
  console.log(movies);

  await browser.close();
}

scrapeIMDB();
