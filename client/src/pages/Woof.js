import './Woof.css';
import DogProd from '../components/DogProd';
import Footer from '../components/Footer';

export default function Woof() {
  return (
    <div className="woof-page">
      <img src="../images/dog-page-hero.png" alt="dog" className="dog-hero" />
      <div className="dog-content-wrap">
        <h1 className="dog-h1">myDogs 🐕</h1>
        <DogProd />
      </div>
      <Footer />
    </div>
  );
}
