import './SignOut.css';
import { fetchWishList, deleteSubscriber, removeWishListItem } from '../lib';
import { useEffect, useState } from 'react';
import { Product } from '../components/Product';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import Footer from '../components/Footer';

export default function SignOut() {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const stringData = localStorage.getItem('userInput');
    if (stringData !== null) {
      const userData = JSON.parse(stringData);
      setUserData(userData);
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  useEffect(() => {
    async function loadWishList() {
      try {
        const products = await fetchWishList(userData.userId);
        setProducts(products);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (userData !== undefined) {
      setIsLoading(true);
      loadWishList();
    }
  }, [userData]);

  async function handleSignOut() {
    try {
      sessionStorage.removeItem('token');
      localStorage.removeItem('account');
      navigate('/signin');
    } catch (err) {
      setError(err);
    } finally {
      window.location.reload();
    }
  }

  async function handleDeleteAcc() {
    try {
      await deleteSubscriber(userData.userId);
      localStorage.removeItem('userInput');
      localStorage.removeItem('account');
      alert(`Your account has been deleted`);
      navigate('/subscription');
    } catch (err) {
      setError(err);
      alert(`Error unsubscribing: ${err}`);
    }
  }

  async function handleRemoveItem(productId, userId) {
    try {
      await removeWishListItem(productId, userId);
      setProducts(
        products.filter((product) => product.productId !== productId)
      );
      alert(`Item has been removed from myWishList.`);
      window.location.reload();
    } catch (err) {
      setError(err);
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
          <div key={product.productId} className="prod-wrap wishlist-remove">
            <Product product={product} />
            <button
              onClick={() =>
                handleRemoveItem(product.productId, userData.userId)
              }
              className="remove-btn">
              <FaTrashAlt className="trash-icon" />
              Remove from myWishList
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
