const getSortedLibraryByName = library =>
  library.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });

const getSortedLibraryByAuthor = library =>
  library.sort((a, b) => {
    if (a.author < b.author) {
      return -1;
    }
    if (a.author > b.author) {
      return 1;
    }
    return 0;
  });

export { getSortedLibraryByName, getSortedLibraryByAuthor };
