import React from "react";
import styled from "styled-components";
const GENRES = ["any", "horror", "finance", "thriller", "art", "health"];
const HeaderWrapper = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1``;

const RadioButton = styled.input.attrs(({ gender }) => ({
  type: "radio",
  id: gender,
  name: "gender",
  value: gender
}))``;

const Label = styled.label`
  text-transform: capitalize;
`;

export const GenderChoice = ({ gender, onClick, isDefault }) => (
  <>
    <Label htmlFor={gender}>{gender}</Label>
    <RadioButton
      data-testid="radio-button"
      gender={gender}
      onClick={onClick}
      checked={isDefault}
    />
  </>
);

const GenreFilterInput = styled.select``;

export const GenreFilter = ({ onChange }) => (
  <>
    <GenreFilterInput onChange={onChange}>
      {GENRES.map(v => (
        <option key={`key-${v}`} value={v} data-testid={`option-${v}`}>
          {v}
        </option>
      ))}
    </GenreFilterInput>
  </>
);
export const SortButton = styled.button``;

const Header = ({ title = "Library", children }) => (
  <HeaderWrapper>
    <Title>{title}</Title>
    {children}
  </HeaderWrapper>
);

export default Header;
