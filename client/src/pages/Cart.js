import './Cart.css';
import { Link } from 'react-router-dom';
import { fetchCart, removeCartItem } from '../lib';
import { useEffect, useState } from 'react';
import { Product } from '../components/Product';
import { FaTrashAlt } from 'react-icons/fa';

export default function Cart() {
  const stringData = localStorage.getItem('userInput');
  const userData = JSON.parse(stringData);
  const userId = userData.userId;

  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadCart() {
      try {
        const products = await fetchCart(userId);
        setProducts(products);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadCart();
  }, [userId]);

  async function handleRemoveItem(productId) {
    try {
      await removeCartItem(productId);
      setProducts(
        products.filter((product) => products.productId !== productId)
      );
      alert(`Item has been removed from myWishList.`);
      window.location.reload();
    } catch (err) {
      setError(err);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) console.log(error);
  if (error)
    return (
      <h2 className="cart-error-h2">
        You must be logged in to access your cart. Please navigate to{' '}
        <Link to="/signin"> Account </Link> and sign in.
      </h2>
    );

  return (
    <div className="cart-container">
      <h1 className="cart-h1">Hi {userData.firstName}!</h1>
      <h2 className="cart-h2">myCart</h2>
      <div className="product-list">
        {products?.map((product) => (
          <div key={product.productId} className="prod-wrap remove">
            <Product product={product} />
            <button
              onClick={() => handleRemoveItem(product.productId)}
              className="remove-btn">
              <FaTrashAlt className="trash-icon" />
              Remove from Cart
            </button>
          </div>
        ))}
      </div>
      <div className="col btn-wrap">
        <Link to="/">
          <div className="back-btn-wrap">
            <button className="btn home-btn">Home</button>
          </div>
        </Link>
        <Link to="/meow">
          <div className="back-btn-wrap">
            <button className="btn home-btn">Cats Page</button>
          </div>
        </Link>
        <Link to="/woof">
          <div className="back-btn-wrap">
            <button className="btn home-btn">Dogs Page</button>
          </div>
        </Link>
        <Link to="/catalog">
          <div className="back-btn-wrap">
            <button className="btn home-btn">Catalog Page</button>
          </div>
        </Link>
      </div>
    </div>
  );
}
