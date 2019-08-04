const NUMBER_OF_CHUNKS = 100;

export const splitLibrary = library => {
  const dataSplitted = [];

  for (let i = 0; i < library.length; i += NUMBER_OF_CHUNKS) {
    dataSplitted.push(library.slice(i, i + NUMBER_OF_CHUNKS));
  }
  return dataSplitted;
};

const getInitialData = ({ data: { authors, library } }) => ({
  library: splitLibrary(library),
  authors
});

export default getInitialData;
