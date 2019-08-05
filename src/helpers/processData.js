const NUMBER_OF_CHUNKS = 100;

export const splitLibrary = (library, numberOfChunks = NUMBER_OF_CHUNKS) => {
  const dataSplitted = [];

  for (let i = 0; i < library.length; i += numberOfChunks) {
    dataSplitted.push(library.slice(i, i + numberOfChunks));
  }
  return dataSplitted;
};

const getInitialData = (
  { data: { authors, library } },
  numberOfChunks = NUMBER_OF_CHUNKS
) => ({
  library: splitLibrary(library, numberOfChunks),
  authors
});

export default getInitialData;
