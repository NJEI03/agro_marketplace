import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "farmer", // Default role
    location: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/signup", formData);
      alert(response.data.message);
      navigate("/login"); // Redirect to login page
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    }
  };

return (
    <div className="form-container">
        <h2>Signup</h2>
        {error && <p className="error-message" style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
            <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
            <select name="role" onChange={handleChange}>
                <option value="farmer">Farmer</option>
                <option value="buyer">Buyer</option>
            </select>
            <input type="file" name="profileImage" onChange={handleChange} />
            <button type="submit">Signup</button>
        </form>
    </div>
);
};

export default Signup;
