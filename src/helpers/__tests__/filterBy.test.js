import {
  filterLibraryByGenre,
  filterLibraryByAuthorGenre,
  getAuthorGender
} from "../filterBy";
const {
  data: { authors, library }
} = require("../../__mocks__/data.json");

describe("filterBy", () => {
  it("should filter by genre", () => {
    const filteredLibrary = filterLibraryByGenre(library, "horror");
    const expectedResult = [
      {
        title: "et aut maxime",
        author: "Rachael Welch",
        genre: "horror",
        publishDate: "2018-11-12T14:21:10.563Z"
      },
      {
        title: "ex voluptates dolorem",
        author: "Oleta Mayer",
        genre: "horror",
        publishDate: "1978-10-09T13:02:38.195Z"
      }
    ];
    expect(filteredLibrary).toEqual(expectedResult);
  });
  it("should filter by author gender", () => {
    const filteredByGender = filterLibraryByAuthorGenre(
      library,
      authors,
      "female"
    );

    const expectedResult = [
      {
        title: "temporibus ut qui",
        author: "Rachael Welch",
        genre: "art",
        publishDate: "2013-05-04T23:19:27.147Z"
      },
      {
        title: "et aut maxime",
        author: "Rachael Welch",
        genre: "horror",
        publishDate: "2018-11-12T14:21:10.563Z"
      },
      {
        title: "placeat autem sit",
        author: "Tatyana Reichel",
        genre: "health",
        publishDate: "1934-11-11T15:43:41.348Z"
      },
      {
        title: "et eos natus",
        author: "Dee Cassin II",
        genre: "art",
        publishDate: "1944-10-04T22:19:47.282Z"
      },
      {
        title: "non voluptatem quo",
        author: "Tatyana Reichel",
        genre: "finance",
        publishDate: "2008-07-31T11:34:38.855Z"
      },
      {
        title: "ex voluptates dolorem",
        author: "Oleta Mayer",
        genre: "horror",
        publishDate: "1978-10-09T13:02:38.195Z"
      },
      {
        title: "deserunt sed id",
        author: "Aidan Sauer II",
        genre: "thriller",
        publishDate: "2017-12-14T21:02:51.984Z"
      },
      {
        title: "et nobis officiis",
        author: "Dee Cassin II",
        genre: "finance",
        publishDate: "2019-07-21T03:33:33.208Z"
      },
      {
        title: "hic voluptates qui",
        author: "Oleta Mayer",
        genre: "health",
        publishDate: "2018-12-14T15:03:48.655Z"
      }
    ];

    expect(filteredByGender).toEqual(expectedResult);
  });
  it("should return the author gender", () => {
    const authorName = "Martina Gorczany";
    const authorGender = getAuthorGender(authors, authorName);
    expect(authorGender).toEqual("female");
  });
});
