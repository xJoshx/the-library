import React from "react";
import { render, cleanup } from "@testing-library/react";
import Book from "../";

const mockData = {
  title: "temporibus ut qui",
  author: "Rachael Welch",
  genre: "art",
  publishDate: "2013-05-04T23:19:27.147Z"
};

const renderComponent = ({
  title = mockData.title,
  author = mockData.author,
  genre = mockData.genre,
  publishDate = mockData.publishDate
}) =>
  render(
    <Book
      title={title}
      author={author}
      genre={genre}
      publishDate={publishDate}
    />
  );

beforeEach(() => {
  cleanup();
});

describe("Book component", () => {
  it("should show the book with the whole information", () => {
    const { getByText, queryByText } = renderComponent({});
    expect(queryByText(/👻/)).toBeNull();
    expect(getByText(/temporibus ut qui/));
    expect(getByText(/Rachael Welch/));
    expect(getByText(/art/));
    expect(getByText(/05\/05\/2013/));
  });
  it("should show the halloween indicator when it's halloween and it's horror genre", () => {
    const { getByText } = renderComponent({
      genre: "horror",
      publishDate: new Date(2019, 9, 31)
    });
    expect(getByText(/👻/));
    expect(getByText(/Rachael Welch/));
    expect(getByText(/horror/));
    expect(getByText(/31\/10\/2019/));
  });
  it("should NOT show the halloween indicator when it's halloween but it's NOT horror genre", () => {
    const { getByText, queryByText } = renderComponent({
      genre: "art",
      publishDate: new Date(2019, 9, 31)
    });
    expect(queryByText(/👻/)).toBeNull();
    expect(getByText(/Rachael Welch/));
    expect(getByText(/art/));
    expect(getByText(/31\/10\/2019/));
  });
  it("should show the indicator when it's last friday of the month and it's finance genre", () => {
    const { getByText, queryByText } = renderComponent({
      genre: "finance",
      publishDate: new Date(2019, 9, 25)
    });
    expect(queryByText(/🤑/));
    expect(getByText(/Rachael Welch/));
    expect(getByText(/finance/));
    expect(getByText(/25\/10\/2019/));
  });
  it("should NOT show the indicator when it's last friday of the month and it's finance genre", () => {
    const { getByText, queryByText } = renderComponent({
      genre: "art",
      publishDate: new Date(2019, 9, 25)
    });
    expect(queryByText(/🤑/)).toBeNull();
    expect(getByText(/Rachael Welch/));
    expect(getByText(/art/));
    expect(getByText(/25\/10\/2019/));
  });
});
