var fs = require('fs')
var faker = require('faker')

const GENRES = ['Horror', 'Finance', 'Thriller', 'Art', 'Health']
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
]

const generateAuthors = number => {
  const AUTHORS = []

  for (let i = 0; i < number; i++) {
    AUTHORS.push({
      name: AUTHORS_NAMES[i],
      genre: GENRES[faker.random.number(GENRES.length - 1)]
    })
  }

  return AUTHORS
}

const generateBooks = (authors, number) => {
  const BOOKS = []

  for (let i = 0; i < number; i++) {
    const authorIndex = faker.random.number(authors.length - 1)
    const { name, genre } = authors[authorIndex]
    const title = faker.lorem.words(3)
    const publishDate = faker.date.past(faker.random.number(100))

    BOOKS.push({
      title,
      author: name,
      genre,
      publishDate
    })
  }

  return BOOKS
}

const AUTHORS_LIST = generateAuthors(AUTHORS_NAMES.length)
const LIBRARY = generateBooks(AUTHORS_LIST, 1000000)
const DATA = {
  data: {
    authors: AUTHORS_LIST,
    library: LIBRARY
  }
}

const dataset = JSON.stringify(DATA)
fs.writeFile('data.json', dataset, err => {
  if (err) throw err
  console.log('The file has been saved!')
})
