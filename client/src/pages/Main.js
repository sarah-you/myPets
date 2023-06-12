import Carousel from '../components/Carousel';
import ShopByPets from '../components/ShopByPets';
import PetFav from '../components/PetFav';

const img = [
  {
    id: 1,
    url: '/images/carousel/carousel1.jpeg',
    alt: 'cat playing with kids',
    petType: 'cat',
  },
  {
    id: 2,
    url: '/images/carousel/carousel2.jpeg',
    alt: 'dog running with ball',
    petType: 'dog',
  },
  {
    id: 3,
    url: '/images/carousel/carousel3.jpeg',
    alt: 'kids petting cat',
    petType: 'cat',
  },
  {
    id: 4,
    url: '/images/carousel/carousel4.jpeg',
    alt: 'dogs playing together',
    petType: 'dog',
  },
];

export default function Main() {
  return (
    <>
      <Carousel img={img} />
      <ShopByPets />
      <PetFav />
    </>
  );
}