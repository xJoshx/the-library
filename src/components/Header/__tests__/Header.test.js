import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Header, { GenderChoice, GenreFilter } from "../";

const mockData = {
  title: "Library"
};

const renderComponent = ({ title = mockData.title, children }) =>
  render(<Header title={title}>{children}</Header>);

beforeEach(() => {
  cleanup();
});

describe("Header component", () => {
  it("should display the header with a Title", () => {
    const { getByText } = renderComponent({});
    expect(getByText(/Library/));
  });

  it("should display the header with a GenderChoice if provided", () => {
    const mockedFunction = { onClick: jest.fn };
    const spy = jest.spyOn(mockedFunction, "onClick");
    const { getByText, getByTestId } = renderComponent({
      children: (
        <GenderChoice gender="female" onClick={mockedFunction.onClick} />
      )
    });
    expect(getByText("female"));
    triggerClick(getByTestId, "radio-button");
    expect(spy).toHaveBeenCalled();
  });
});

it("should display the header with a GenreFilter if provided", () => {
  const mockedFunction = { onChange: jest.fn };
  const spy = jest.spyOn(mockedFunction, "onChange");
  const { getByText, getByTestId } = renderComponent({
    children: <GenreFilter onChange={mockedFunction.onChange} />
  });
  expect(getByText("any"));
  fireEvent.change(getByTestId("option-horror"));
  expect(spy).toHaveBeenCalled();
});

function triggerClick(query, element) {
  return fireEvent(
    query(element),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true
    })
  );
}
