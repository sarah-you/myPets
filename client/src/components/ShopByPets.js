import './ShopByPets.css';
import { useNavigate } from 'react-router-dom';

export default function ShopByPets({ Link }) {
  const navigate = useNavigate();

  const handleClickCat = () => {
    navigate('meow');
  };

  const handleClickDog = () => {
    navigate('woof');
  };
  return (
    <div className="shop-by-pets-wrap">
      <h2 className="shop-by-pets">Shop by Pets 🦴</h2>
      <div className="btns-wrap">
        <button className="cat-btn" onClick={handleClickCat}>
          <img src="images/cat-page-link.webp" alt="kitten" />
          <span className="cat-btn-text"></span>
        </button>
        <button className="dog-btn" onClick={handleClickDog}>
          <img src="images/dog-page-link.jpeg" alt="puppy" />
          <span className="dog-btn-text"></span>
        </button>
      </div>
    </div>
  );
}
