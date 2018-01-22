import DefaultPoster from '../images/default-poster.png'

export default function (width, path) {
  return path ? `http://image.tmdb.org/t/p/w${width}/${path}` : DefaultPoster
}