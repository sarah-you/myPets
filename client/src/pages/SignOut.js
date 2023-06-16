import './SignOut.css';
import { fetchWishList, deleteSubscriber } from '../lib';
import { useEffect, useState } from 'react';
import { Product } from '../components/Product';
import { useNavigate } from 'react-router-dom';

export default function SignOut() {
  const stringData = localStorage.getItem('userInput');
  const userData = JSON.parse(stringData);

  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadWishList() {
      try {
        const products = await fetchWishList();
        setProducts(products);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadWishList();
  }, []);

  async function handleSignOut() {
    sessionStorage.removeItem('token');
    localStorage.removeItem('account');
    navigate('/signin');
  }

  async function handleDeleteAcc() {
    try {
      await deleteSubscriber(userData.userId);
      localStorage.removeItem('userInput');
      localStorage.removeItem('account');
      alert(`Your account has been deleted`);
      navigate('/subscription');
    } catch (err) {
      setError(error);
      alert(`Error unsubscribing: ${err}`);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) console.log(error);
  if (error) return <div>Error Loading myWishList: {error.message}</div>;

  return (
    <div className="signout-container">
      <img
        src="../images/signout-hero.png"
        alt="owner and dog"
        className="signout-hero"
      />
      <div className="signout-header-wrap">
        <h1 className="signout-h1">Welcome {userData.firstName}!</h1>
        <div className="signout-btns-wrap">
          <button onClick={handleSignOut} className="signout-btn">
            Sign Out
          </button>
          <div className="unsubscribe-btn-wrap">
            <button onClick={handleDeleteAcc} className="unsubscribe-btn">
              Delete my Account 🥺
            </button>
          </div>
        </div>
      </div>
      <h2 className="signout-h2">myWishList</h2>
      <div className="product-list">
        {products?.map((product) => (
          <div key={product.productId} className="prod-wrap">
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
