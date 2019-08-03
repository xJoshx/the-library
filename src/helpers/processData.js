const NUMBER_OF_CHUNKS = 100

const splitData = ({ data: { authors, library } }) => {
  const dataSplitted = []

  for (let i = 0; i < library.length; i += NUMBER_OF_CHUNKS) {
    dataSplitted.push(library.slice(i, i + NUMBER_OF_CHUNKS))
  }

  return { authors, library: dataSplitted }
}

export default splitData
