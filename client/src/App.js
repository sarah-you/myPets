import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Main from './pages/Main';
import Meow from './pages/Meow';
import Woof from './pages/Woof';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import Subscription from './pages/Subscription';
import SubscriptionSuccess from './components/SubscriptionSuccess';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound';
import { useState } from 'react';

function App() {
  const [page, setPage] = useState('sign-in');

  function handleNavigate(page) {
    setPage(page);
    if (page === 'sign-out') {
      sessionStorage.removeItem('token');
      setPage('sign-in');
    }
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Main />} />
          <Route path="meow" element={<Meow />} />
          <Route path="woof" element={<Woof />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="details/:productId" element={<ProductDetails />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="success" element={<SubscriptionSuccess />} />
          <Route
            path="signin"
            element={
              page === 'sign-in' && (
                <SignIn onSignIn={() => handleNavigate('/')} />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
