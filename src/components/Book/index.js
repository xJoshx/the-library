import React from "react";
import styled from "styled-components";
import { format } from "date-fns";

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
const HalloweenIndicator = styled.span``;

const checkIfHalloween = publishDate => {
  const formattedDate = format(publishDate, "DD/MM");

  return formattedDate === HALLOWEEN_DATE;
};

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

export default Book;
