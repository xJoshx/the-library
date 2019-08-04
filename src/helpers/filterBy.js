const filterLibraryByGenre = (library, genre) => {
  if (genre === "any") {
    return library;
  }
  return library.filter(i => i.genre === genre.toLowerCase());
};

const getAuthorGender = (authors, author) => {
  const { gender } = authors.find(i => i.name === author);
  return gender;
};

const filterLibraryByAuthorGenre = (library, authors, gender) => {
  if (gender === "both") {
    return library;
  }

  return library.filter(
    i => getAuthorGender(authors, i.author) === gender.toLowerCase()
  );
};

export { filterLibraryByGenre, filterLibraryByAuthorGenre, getAuthorGender };
