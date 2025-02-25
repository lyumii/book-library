export async function fetchBooksSearch(query: string) {
  const response = await fetch(`https://gutendex.com/books?search=${query}`);
  const data = await response.json();
  return data.results;
}

export async function fetchBooksCategory(category: string) {
  const response = await fetch(`https://gutendex.com/books?topic=${category}`);
  const data = await response.json();
  return data.results;
}

export async function fetchBooksId(id: string) {
  const response = await fetch(`https://gutendex.com/books?ids=${id}`);
  const data = await response.json();
  return data.results;
}
