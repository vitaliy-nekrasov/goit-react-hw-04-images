import axios from 'axios';

export async function getPictures(searchQuery, page) {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=29456353-5465c64cf9d8797860ea8e981&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits;
}
