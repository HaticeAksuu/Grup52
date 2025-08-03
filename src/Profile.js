import React, { useState } from "react";
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState({
    name: "Miray",
    email: "miray@example.com",
    phone: "555-123-4567",
  });

  const [editUser, setEditUser] = useState({ ...user });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
    setError(null); 
    setSuccess(null); 
  };

   const handleSave = () => {

    if (!editUser.email || !/\S+@\S+\.\S+/.test(editUser.email)) {
      setError("Lütfen geçerli bir e-posta adresi girin.");
      setSuccess(null);
      return;
    }
    if (!editUser.name) {
      setError("İsim alanı boş bırakılamaz.");
      setSuccess(null);
      return;
    }

    setUser({ ...editUser });
    setError(null);
    setSuccess("Profil bilgileri başarıyla güncellendi!");
  };


  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2>Profil Bilgileri</h2>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="name" style={{ display: "block", marginBottom: 4 }}>İsim</label>
        <input
          id="name"
          name="name"
          value={editUser.name}
          onChange={handleChange}
          style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>

        <label htmlFor="email" style={{ display: "block", marginBottom: 4 }}>Email</label>
        <input
          id="email"
          name="email"
          value={editUser.email}
          onChange={handleChange}
          type="email"
          style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="phone" style={{ display: "block", marginBottom: 4 }}>Telefon</label>
        <input
          id="phone"
          name="phone"
          value={editUser.phone}
          onChange={handleChange}
          style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
        />
      </div>

      {error && (
        <div style={{ marginBottom: 16, color: "red", fontWeight: "bold" }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ marginBottom: 16, color: "green", fontWeight: "bold" }}>
          {success}
        </div>
      )}

      <button onClick={handleSave} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Kaydet
      </button>

      <div style={{ marginTop: 30, fontSize: 14, color: "#555" }}>
        <p><strong>Güncel Bilgiler:</strong></p>
        <p>İsim: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Telefon: {user.phone}</p>
      </div>
    </div>
  );
}
