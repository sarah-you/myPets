import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Main from './pages/Main';
import Meow from './pages/Meow';
import Woof from './pages/Woof';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import Subscription from './pages/Subscription';
import SubscriptionSuccess from './pages/SubscriptionSuccess';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import NotFound from './pages/NotFound';

function App() {
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
          <Route path="signin" element={<SignIn />} />
          <Route path="signout" element={<SignOut />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
