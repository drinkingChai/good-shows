import DefaultPoster from '../images/default-poster.png'

export const getPosterUrl = (width, path) => {
  return path ? `http://image.tmdb.org/t/p/w${width}/${path}` : DefaultPoster
}