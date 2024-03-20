const puppeteer = require("puppeteer");
const fs = require("fs");

const scrapper = async (url) => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.setViewport({ width: 1080, height: 1024 });

  const characters = await repeat(page);
  await write(characters);

  browser.close();
};

const repeat = async (page) => {
  const arrayDivs = await page.$$(".blocks-container.ref-1-3");
  const characters = [];

  for (const divCharacter of arrayDivs) {
    let name;
    let img;

    img = await divCharacter.$eval(".thumb.reserved-ratio", (el) => el.src);
    name = await divCharacter.$eval(".long-title", (el) => el.textContent);

    const character = {
      name,
      img,
    };
    characters.push(character);
  }

  console.log(`Collected ${characters.length} characters`);
  return characters;
};

const write = async (characters) => {
  try {
    await fs.promises.writeFile(
      "character.json",
      JSON.stringify(characters, null, 2)
    );
    console.log('Characters written to "character.json" correctly');
  } catch (error) {
    console.error("Error writing characters to file:", error);
  }
};

module.exports = { scrapper };
