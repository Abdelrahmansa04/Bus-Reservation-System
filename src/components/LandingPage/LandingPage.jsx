import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; // Apply the styles from below

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="overlay">
        <h1>Welcome to Bus Reservation</h1>
        <p className="description">Easily reserve your seat and enjoy the journey.</p>
        <div className="btn-container">
          <button onClick={() => navigate("/login")} className="btn user-btn">
            Login as User
          </button>
          <button onClick={() => navigate("/admin-login")} className="btn admin-btn">
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
