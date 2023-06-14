import { Link } from 'react-router-dom';
import { FaCaretLeft } from 'react-icons/fa';
import './Woof.css';
import DogProd from '../components/DogProd';

export default function Woof() {
  return (
    <div className="woof-page">
      <img src="../images/dog-page-hero.png" alt="dog" className="dog-hero" />
      <div className="dog-content-wrap">
        <h1 className="dog-h1">myDogs 🐕</h1>
        <DogProd />
        <Link to="/">
          <div className="back-btn-wrap">
            <FaCaretLeft />
            <button className="btn home-btn">Back to Home</button>
          </div>
        </Link>
      </div>
    </div>
  );
}
