import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const [error,setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", formData);
        login(response.data.user); // Update user context
      localStorage.setItem("token", response.data.token);
      alert("Login successful");
      navigate("/dashboard"); // Redirect to dashboard (to be created later)
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

return (
    <div className="form-container">
        <h2>Login</h2>
        {error && <p className="error-message" style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
        </form>
    </div>
);
};

export default Login;
