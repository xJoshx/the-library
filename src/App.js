import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header, {
  GenderChoice,
  GenreFilter,
  SortButton
} from "./components/Header";
import Book from "./components/Book";
import { splitLibrary } from "./helpers/processData";
import {
  filterLibraryByGenre,
  filterLibraryByAuthorGenre,
  getAuthorGender,
  getSortedLibraryByName,
  getSortedLibraryByAuthor
} from "./helpers";
const { data } = require("./server/data.json");

const Library = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function App() {
  const [state, setState] = useState(null);
  const [library, setLibrary] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPageLoaded, setlastPageLoaded] = useState(0);

  const updateDataset = data => {
    const splittedLibrary = splitLibrary(data);
    setLibrary(splittedLibrary);
    setlastPageLoaded(0);

    return splittedLibrary;
  };

  const sortByTitle = () => {
    setIsLoading(true);
    const sortedLibraryByName = getSortedLibraryByName(data.library);
    const splittedLibrary = updateDataset(sortedLibraryByName);
    setState(splittedLibrary[lastPageLoaded]);
    setIsLoading(false);
  };

  const sortByAuthor = () => {
    setIsLoading(true);
    const sortedLibraryByAuthor = getSortedLibraryByAuthor(data.library);
    const splittedLibrary = updateDataset(sortedLibraryByAuthor);

    if (splittedLibrary.length === 0) {
      setState([]);
    } else {
      setState(splittedLibrary[lastPageLoaded]);
    }

    setIsLoading(false);
  };

  const filterByGenre = genre => {
    setIsLoading(true);
    const filteredLibraryByGenre = filterLibraryByGenre(data.library, genre);
    const splittedLibrary = updateDataset(filteredLibraryByGenre);

    if (splittedLibrary.length === 0) {
      setState([]);
    } else {
      setState(splittedLibrary[lastPageLoaded]);
    }

    setIsLoading(false);
  };

  const filterByAuthorGender = gender => {
    setIsLoading(true);
    const filteredLibraryByAuthorGender = filterLibraryByAuthorGenre(
      data.library,
      data.authors,
      gender
    );
    const splittedLibrary = updateDataset(filteredLibraryByAuthorGender);

    if (splittedLibrary.length === 0) {
      setState([]);
    } else {
      setState(splittedLibrary[lastPageLoaded]);
    }

    setIsLoading(false);
  };

  const handleLoadInitialData = () => {
    const splittedLibrary = updateDataset(data.library);
    setState(splittedLibrary[0]);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }

    setIsFetching(true);
  };

  const handleFetchNewData = () => {
    if (!isFetching) return;
    if (library[lastPageLoaded]) {
      setState([...state, ...library[lastPageLoaded]]);
      setlastPageLoaded(lastPageLoaded + 1);
    }
    setIsFetching(false);
  };

  const handleInfiniteScroll = () => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  };

  useEffect(() => {
    handleLoadInitialData();
    handleInfiniteScroll();
  }, []);

  useEffect(handleFetchNewData, [isFetching]);

  return state ? (
    isLoading ? (
      <div>Loading data...</div>
    ) : (
      <>
        <Header>
          <GenderChoice
            gender="female"
            onClick={() => filterByAuthorGender("female")}
          />
          <GenderChoice
            gender="male"
            onClick={() => filterByAuthorGender("male")}
          />
          <GenderChoice
            gender="both"
            onClick={() => filterByAuthorGender("both")}
          />
          <GenreFilter onChange={e => filterByGenre(e.target.value)} />
          <SortButton onClick={sortByTitle}>Sort by title</SortButton>
          <SortButton onClick={sortByAuthor}>Sort by author</SortButton>
        </Header>
        {state.length ? (
          <Library>
            {state.map((i, index) => (
              <Book
                {...i}
                authorGender={getAuthorGender(data.authors, i.author)}
                key={index}
              />
            ))}
          </Library>
        ) : (
          <div>Ooops, we couldn't find anything mathing those params :(</div>
        )}

        {isFetching && <div>Fetching more items...</div>}
      </>
    )
  ) : (
    <span>Loading...</span>
  );
}

export default App;
