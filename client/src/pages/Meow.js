import './Meow.css';
import CatProd from '../components/CatProd';
import Footer from '../components/Footer';

export default function Meow() {
  return (
    <div className="meow-page">
      <img src="../images/cat-page-hero.png" alt="cat" className="cat-hero" />
      <div className="cat-content-wrap">
        <h1 className="cat-h1">myCats 🐈</h1>
        <CatProd />
      </div>
      <Footer />
    </div>
  );
}
