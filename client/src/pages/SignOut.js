import './SignOut.css';

export default function SignOut() {
  const stringData = localStorage.getItem('userInput');
  const userData = JSON.parse(stringData);

  return (
    <div className="signout-container">
      <img
        src="../images/signout-hero.png
    "
        alt="owner and dog"
        className="signout-hero"
      />
      <h1 className="signout-h1">Welcome {userData.firstName}!</h1>
      <h2 className="signout-h2">myWishList</h2>
    </div>
  );
}
