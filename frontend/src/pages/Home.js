import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to AgroLink</h1>
      <p>Connecting Farmers and Buyers Directly</p>
      <Link to="/signup"><button>Sign Up</button></Link>
      <Link to="/login"><button>Login</button></Link>
    </div>
  );
};

export default Home;
