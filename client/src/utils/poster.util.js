import DefaultPoster from '../images/default-poster.png'

export const getPosterUrl = (size, path) => {
  return path ? `http://image.tmdb.org/t/p/w${size}/${path}` : DefaultPoster
}