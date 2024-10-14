const API_URL = 'https://63c10327716562671870f959.mockapi.io';

export const getBooks = async () => {
  const response = await fetch(`${API_URL}/books`);
  return await response.json();
};
