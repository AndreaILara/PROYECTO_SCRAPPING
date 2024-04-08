const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const scrapper = async (url) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized'],
  })
  const page = await browser.newPage();
  await page.goto(url);
  await page.setViewport({ width: 1080, height: 1024 });

  const characters = await repeat(page);
  await write(characters);

  browser.close();
};
const repeat = async (page) => {
  const arrayLi = await page.$$(".blocks-list-view.active.el3_7-el3_7-el3_7-el3_7-el3_7-el3_7 li.building-block-config");
  const characters = [];

  for (const liElement of arrayLi) {
    let name;
    let img;


    const imgElement = await liElement.$(".image-wrapper img");

    img = await imgElement.evaluate(img => img.getAttribute('src'));


    name = await liElement.$eval(".content-bumper", (el) => el.textContent.trim());

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
    const outputPath = path.join(__dirname, "..", "..", "character.json");
    await fs.promises.writeFile(
      outputPath,
      JSON.stringify(characters, null, 2)
    );
    console.log('Characters written to "character.json" correctly');
  } catch (error) {
    console.error("Error writing characters to file:", error);
  }
};
module.exports = { scrapper };