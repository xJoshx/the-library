import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { splitLibrary } from "./helpers/processData";
const { data } = require("./data.json");
const HALLOWEEN_DATE = "31/10";

const LibraryItem = styled.li`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
  margin-bottom: 16px;
  padding: 8px 16px 0 16px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  width: 300px;
  height: 160px;
  overflow: hidden;
`;

const Title = styled.h3``;
const Author = styled.span``;
const Genre = styled.span``;
const PublishDate = styled.span``;

const Authors = styled.div``;

const Library = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const checkIfHalloween = publishDate => {
  const formattedDate = format(publishDate, "DD/MM");

  return formattedDate === HALLOWEEN_DATE;
};

const HalloweenIndicator = styled.span``;

const Book = ({ title, author, genre, publishDate, authorGender }) => (
  <LibraryItem>
    {checkIfHalloween(publishDate) && (
      <HalloweenIndicator>👻</HalloweenIndicator>
    )}
    <Title>{title}</Title>
    <Author>
      {author} - {authorGender}
    </Author>
    <Genre>{genre}</Genre>
    <PublishDate>{format(publishDate, "DD/MM/YYYY")}</PublishDate>
  </LibraryItem>
);

function App() {
  const [state, setState] = useState(null);
  const [library, setLibrary] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPageLoaded, setlastPageLoaded] = useState(0);

  useEffect(() => {
    const splittedLibrary = splitLibrary(data.library);
    setLibrary(splittedLibrary);
    setState(splittedLibrary[0]);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    setIsFetching(true);
  };

  const sortByTitle = () => {
    setIsLoading(true);
    const sortedLibraryByName = data.library.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
    const splittedLibrary = splitLibrary(sortedLibraryByName);
    setLibrary(splittedLibrary);
    setlastPageLoaded(0);
    setState([...splittedLibrary[lastPageLoaded]]);
    setIsLoading(false);
  };

  const sortByAuthor = () => {
    setIsLoading(true);
    const sortedLibraryByAuthor = data.library.sort((a, b) => {
      if (a.author < b.author) {
        return -1;
      }
      if (a.author > b.author) {
        return 1;
      }
      return 0;
    });

    const splittedLibrary = splitLibrary(sortedLibraryByAuthor);
    setLibrary(splittedLibrary);
    setlastPageLoaded(0);
    if (splittedLibrary.length === 0) {
      setState([]);
    } else {
      setState([...splittedLibrary[lastPageLoaded]]);
    }
    setIsLoading(false);
  };

  const filterByGenre = genre => {
    setIsLoading(true);
    const filteredLibraryByGenre = data.library.filter(
      i => i.genre === genre.toLowerCase()
    );
    const splittedLibrary = splitLibrary(filteredLibraryByGenre);
    setLibrary(splittedLibrary);
    setlastPageLoaded(0);
    if (splittedLibrary.length === 0) {
      setState([]);
    } else {
      setState([...splittedLibrary[lastPageLoaded]]);
    }
    setIsLoading(false);
  };

  const getAuthorGender = author => {
    const { gender } = data.authors.find(i => i.name === author);
    return gender;
  };
  const filterByAuthorGender = gender => {
    setIsLoading(true);
    const filteredLibraryByAuthorGender = data.library.filter(
      i => getAuthorGender(i.author) === gender.toLowerCase()
    );
    const splittedLibrary = splitLibrary(filteredLibraryByAuthorGender);
    setLibrary(splittedLibrary);
    setlastPageLoaded(0);
    if (splittedLibrary.length === 0) {
      setState([]);
    } else {
      setState([...splittedLibrary[lastPageLoaded]]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isFetching) return;
    setState([...state, ...library[lastPageLoaded]]);
    setlastPageLoaded(lastPageLoaded + 1);
    setIsFetching(false);
  }, [isFetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => console.log(state), [state]);

  return state ? (
    isLoading ? (
      <div>Loading data...</div>
    ) : (
      <>
        <h1>Library</h1>
        <div>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            onClick={() => filterByAuthorGender("female")}
          />
          <label for="female">Female</label>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            onClick={() => filterByAuthorGender("male")}
          />
          <label for="male">Male</label>
        </div>
        <input type="text" onBlur={e => filterByGenre(e.target.value)} />
        <button onClick={sortByTitle}>Sort by title</button>
        <button onClick={sortByAuthor}>Sort by author</button>
        {state.length ? (
          <Library>
            {state.map((i, index) => (
              <Book
                {...i}
                authorGender={getAuthorGender(i.author)}
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
    <span>loading...</span>
  );
}

export default App;
