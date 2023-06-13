import { useLocation } from 'react-router-dom';

export default function SubscriptionSuccess(navigate) {
  const loc = useLocation();
  const userData = loc.state;
  return (
    <>
      <p>{userData}</p>
      <p>Subscription Success</p>
    </>
  );
}
