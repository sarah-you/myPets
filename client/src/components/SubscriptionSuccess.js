export default function SubscriptionSuccess(location, navigate) {
  const userData = location.state;
  return (
    <>
      <p>{userData}</p>
    </>
  );
}
