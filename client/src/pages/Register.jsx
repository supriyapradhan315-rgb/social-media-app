import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", {
        username,
        email,
        password,
      });

      alert("Registered Successfully");
      navigate("/");
    } catch (err) {
      alert("Error registering user");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Register</h2>

        <input placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
        <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

        <button onClick={handleRegister}>Create Account</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#111",
    color: "#fff"
  },
  card: {
    padding: 20,
    background: "#222",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: 300
  }
};

export default Register;