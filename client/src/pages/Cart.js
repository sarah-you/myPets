import './Cart.css';
import { fetchWishList, removeItem } from '../lib';
import { useEffect, useState } from 'react';
import { Product } from '../components/Product';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';

export default function Cart() {
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

  async function handleRemoveItem(productId) {
    try {
      await removeItem(productId);
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
  if (error) return <div>Error Loading myCart: {error.message}</div>;

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
    </div>
  );
}
