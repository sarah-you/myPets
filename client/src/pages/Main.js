import Carousel from '../components/Carousel';
import ShopByPets from '../components/ShopByPets';
import PetFav from '../components/PetFav';
import EmailSubscriptionModal from '../components/EmailSubscription';
import './Main.css';

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
      <div className="main-page-container">
        <header className="header-wrap">
          <div className="main-header-text-wrap">
            <h1 className="main-h1">Pamper your pets with premium products</h1>
            <h2 className="main-h2">
              discover a wonderland of tail-wagging delights at myPets!
            </h2>
          </div>
          <div className="carousel-wrapper">
            <Carousel img={img} />
          </div>
        </header>
        <EmailSubscriptionModal />
        <ShopByPets />
        <PetFav />
      </div>
    </>
  );
}
