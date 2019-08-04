const filterLibraryByGenre = (library, genre) =>
  library.filter(i => i.genre === genre.toLowerCase());

const getAuthorGender = (authors, author) => {
  const { gender } = authors.find(i => i.name === author);
  return gender;
};

const filterLibraryByAuthorGenre = (library, authors, gender) =>
  library.filter(
    i => getAuthorGender(authors, i.author) === gender.toLowerCase()
  );

export { filterLibraryByGenre, filterLibraryByAuthorGenre, getAuthorGender };
