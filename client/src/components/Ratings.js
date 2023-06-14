// import { FaStar, FaRegStar, FaRegStarHalf } from 'react-icons/fa';

export default function Ratings({ ratings }) {
  let rating = [];

  if (ratings === 0) {
    rating.push('🌑🌑🌑🌑🌑');
  } else if (ratings <= 1.3) {
    rating.push('🌕🌑🌑🌑🌑');
  } else if (ratings <= 1.8) {
    rating.push('🌕🌗🌑🌑🌑');
  } else if (ratings <= 2.3) {
    rating.push('🌕🌕🌑🌑🌑');
  } else if (ratings <= 2.8) {
    rating.push('🌕🌕🌗🌑🌑');
  } else if (ratings <= 3.3) {
    rating.push('🌕🌕🌕🌑🌑');
  } else if (ratings <= 3.8) {
    rating.push('🌕🌕🌕🌗🌑');
  } else if (ratings <= 4.3) {
    rating.push('🌕🌕🌕🌕🌑');
  } else if (ratings <= 4.8) {
    rating.push('🌕🌕🌕🌕🌗');
  } else if (ratings <= 5) {
    rating.push('🌕🌕🌕🌕🌕');
  } else {
    rating.push('ratings unavailable');
  }

  return <>{rating}</>;
}
