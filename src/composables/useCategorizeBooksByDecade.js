import { computed } from 'vue';

export function useCategorizeBooksByDecade(books) {
  const decades = computed(() => {
    if (!books.value || books.value.length === 0) {
      return [];
    }

    const sortedBooks = [...books.value].sort((a, b) => b.publishYear - a.publishYear);

    const lastYear = sortedBooks[0].publishYear;
    const startYear = sortedBooks[sortedBooks.length - 1].publishYear;

    const tempCategories = [];
    let noPublicationsRanges = [null, null];

    for (let decadeEnd = lastYear; decadeEnd >= startYear; decadeEnd -= 10) {
      const decadeStart = decadeEnd - 9;
      const booksInDecade = getBooksInDecade(sortedBooks, decadeStart, decadeEnd);

      if (booksInDecade.length === 0) {
        noPublicationsRanges[0] = decadeStart;
        if (noPublicationsRanges[1] === null) noPublicationsRanges[1] = decadeEnd;
      } else {
        if (noPublicationsRanges[0] !== null) {
          tempCategories.push({
            range: `${noPublicationsRanges[0]} to ${noPublicationsRanges[1]}`,
            books: [],
          });
          noPublicationsRanges = [null, null];
        }

        tempCategories.push({
          range: `${decadeStart} to ${decadeEnd}`,
          books: booksInDecade,
        });
      }
    }

    if (noPublicationsRanges[0] !== null) {
      tempCategories.push({
        range: `${noPublicationsRanges[0]} to ${noPublicationsRanges[1]}`,
        books: [],
      });
    }

    return tempCategories;
  });

  const getBooksInDecade = (books, startYear, endYear) => {
    return books.filter(book => book.publishYear >= startYear && book.publishYear <= endYear);
  };

  return {
    decades,
  };
}
