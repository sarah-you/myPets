import './SignOut.css';
import { fetchWishList } from '../lib';
import { useEffect, useState } from 'react';
import { Product } from '../components/Product';

export default function SignOut() {
  const stringData = localStorage.getItem('userInput');
  const userData = JSON.parse(stringData);

  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

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
      <h1 className="signout-h1">Welcome {userData.firstName}!</h1>
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
