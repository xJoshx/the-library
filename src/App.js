import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import processData from './helpers/processData'
const dataset = require('./data.json')

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
`
const Title = styled.h3``
const Author = styled.span``
const Genre = styled.span``
const Date = styled.span``

const Authors = styled.div``

const Library = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Book = ({ title, author, genre, publishDate }) => (
  <LibraryItem>
    <Title>{title}</Title>
    <Author>{author}</Author>
    <Genre>{genre}</Genre>
    <Date>{publishDate}</Date>
  </LibraryItem>
)

function App () {
  const [state, setState] = useState(null)
  const [library, setLibrary] = useState(null)
  const [authors, setAuthors] = useState(null)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const processedData = processData(dataset)
    setLibrary(processedData.library)
    setAuthors(processedData.authors)
    setState(processedData.library.shift())
  }, [])

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return
    }
    setIsFetching(true)
  }

  useEffect(
    () => {
      if (!isFetching) return
      // setState([...library, ...library.shift()])
      // fetchMoreListItems();
    },
    [isFetching]
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return state ? (
    <>
      <h1>Library</h1>
      <Library>
        {state.map((i, index) => (
          <Book {...i} key={index} />
        ))}
      </Library>
      {isFetching && <div>Fetching more items...</div>}
    </>
  ) : (
    <span>loading...</span>
  )
}

export default App
