var fs = require("fs");
var faker = require("faker");

const GENRES = ["horror", "finance", "thriller", "art", "health"];
const AUTHORS_NAMES = [
  faker.name.findName(),
  faker.name.findName(),
  faker.name.findName(),
  faker.name.findName(),
  faker.name.findName(),
  faker.name.findName(),
  faker.name.findName(),
  faker.name.findName(),
  faker.name.findName(),
  faker.name.findName()
];

const generateAuthors = number => {
  const AUTHORS = [];

  for (let i = 0; i < number; i++) {
    AUTHORS.push({
      name: AUTHORS_NAMES[i],
      gender: faker.random.number(1) ? "female" : "male"
    });
  }

  return AUTHORS;
};

const generateBooks = (authors, number) => {
  const BOOKS = [];

  for (let i = 0; i < number; i++) {
    const authorIndex = faker.random.number(authors.length - 1);
    const { name } = authors[authorIndex];
    const title = faker.lorem.words(3);
    const publishDate = faker.date.past(faker.random.number(100));
    const genre = GENRES[faker.random.number(GENRES.length - 1)];

    BOOKS.push({
      title,
      author: name,
      genre,
      publishDate
    });
  }

  return BOOKS;
};

const AUTHORS_LIST = generateAuthors(AUTHORS_NAMES.length);
const LIBRARY = generateBooks(AUTHORS_LIST, 10);
const DATA = {
  data: {
    authors: AUTHORS_LIST,
    library: LIBRARY
  }
};

const dataset = JSON.stringify(DATA);
fs.writeFile("data.json", dataset, err => {
  if (err) throw err;
  console.log("The file has been saved!");
});
