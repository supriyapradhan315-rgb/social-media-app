import { useState } from "react";

export default function Profile() {
  const [img, setImg] = useState(null);
  const [name, setName] = useState("Supriya Pradhan");
  const [bio, setBio] = useState("Frontend Developer 🚀");

  return (
    <div style={style}>
      <h1>👤 Profile</h1>

      {/* Upload photo */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setImg(URL.createObjectURL(file));
          }
        }}
      />

      {/* PROFILE IMAGE */}
      <img
        src={img || "https://via.placeholder.com/120"}
        alt="profile"
        style={imgStyle}
      />

      {/* EDIT NAME */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
        placeholder="Your name"
      />

      {/* EDIT BIO */}
      <input
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        style={inputStyle}
        placeholder="Your bio"
      />

      <h2>{name}</h2>
      <p>{bio}</p>
    </div>
  );
}

const style = {
  background: "#000",
  color: "white",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
};

const imgStyle = {
  width: 120,
  height: 120,
  borderRadius: "50%",
  objectFit: "cover",
  border: "3px solid #ff2d55",
};

const inputStyle = {
  padding: 10,
  borderRadius: 8,
  border: "none",
  outline: "none",
  width: 200,
};