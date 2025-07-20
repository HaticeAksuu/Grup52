import React, { useState, useEffect } from 'react';
import './Profile.css';

function Profile() {

  const [user, setUser] = useState({
    firstName: 'Miray',
    lastName: 'Aykın',
    email: 'miray.aykin@gmail.com',
    phoneNumber: '+90 555 555 55 55',
    memberSince: '30 Ağustos 2025',
    totalUploads: 5,
    lastDiagnosisDate: '10 Temmuz 2025',
  });

  
  const [editUser, setEditUser] = useState({ ...user });
 
  const [isEditing, setIsEditing] = useState(false);
  
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
 
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser(prev => ({ ...prev, [name]: value }));
  };


  const handleEditClick = () => {
    setIsEditing(true);
    setEditUser({ ...user }); 
    setError(null);
    setSuccess(null);
  };

  
  const handleSaveClick = async () => {
   
    if (!editUser.firstName || !editUser.lastName || !editUser.email) {
        setError("İsim, soyisim ve e-posta alanları boş bırakılamaz.");
        return;
    }
    if (!/\S+@\S+\.\S+/.test(editUser.email)) {
        setError("Geçerli bir e-posta adresi girin.");
        return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
     
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      setUser(editUser); 
      setIsEditing(false); 
      setSuccess("Profil bilgileriniz başarıyla güncellendi!");
      console.log('Profil güncellendi:', editUser);

    } catch (err) {
      setError("Profil güncellenirken bir hata oluştu. Lütfen tekrar deneyin.");
      console.error('Profil güncelleme hatası:', err);
    } finally {
      setLoading(false);
    }
  };

  
  const handleCancelClick = () => {
    setIsEditing(false);
    setEditUser({ ...user }); 
    setError(null);
    setSuccess(null);
  };


  const handleLogout = () => {

    alert('Çıkış yapıldı!');
    window.location.href = '/'; 
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Hoş Geldiniz, {user.firstName}</h1>
        <p>Hesap bilgilerinizi buradan görüntüleyebilir ve yönetebilirsiniz.</p>
      </div>

      {loading && <p style={{ textAlign: 'center', color: '#007bff' }}>Yükleniyor...</p>}
      {error && (
        <div style={{ marginTop: 10, padding: 15, backgroundColor: '#ffe6e6', border: '1px solid #ffcccc', borderRadius: 5, color: '#cc0000', textAlign: 'center' }}>
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div style={{ marginTop: 10, padding: 15, backgroundColor: '#e6ffe6', border: '1px solid #ccffcc', borderRadius: 5, color: '#28a745', textAlign: 'center' }}>
          <p>{success}</p>
        </div>
      )}

      {isEditing ? (

        <div className="profile-edit-form">
          <div className="form-group">
            <label htmlFor="firstName">İsim:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={editUser.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Soyisim:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={editUser.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-posta:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={editUser.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Telefon:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={editUser.phoneNumber}
              onChange={handleChange}
            />
          </div>
        
          <div className="info-item">
            <strong>Üyelik Tarihi:</strong> <span>{user.memberSince}</span>
          </div>
          <div className="info-item">
            <strong>Toplam Yükleme:</strong> <span>{user.totalUploads}</span>
          </div>
          <div className="info-item">
            <strong>Son Teşhis Tarihi:</strong> <span>{user.lastDiagnosisDate}</span>
          </div>

          <div className="profile-actions">
            <button onClick={handleSaveClick} className="profile-button" disabled={loading}>
              {loading ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
            <button onClick={handleCancelClick} className="profile-button cancel" disabled={loading}>
              İptal
            </button>
          </div>
        </div>
      ) : (

        <div className="profile-info">
          <div className="info-item">
            <strong>İsim:</strong> <span>{user.firstName}</span>
          </div>
          <div className="info-item">
            <strong>Soyisim:</strong> <span>{user.lastName}</span>
          </div>
          <div className="info-item">
            <strong>E-posta:</strong> <span>{user.email}</span>
          </div>
          <div className="info-item">
            <strong>Telefon:</strong> <span>{user.phoneNumber}</span>
          </div>
          <div className="info-item">
            <strong>Üyelik Tarihi:</strong> <span>{user.memberSince}</span>
          </div>
          <div className="info-item">
            <strong>Toplam Yükleme:</strong> <span>{user.totalUploads}</span>
          </div>
          <div className="info-item">
            <strong>Son Teşhis Tarihi:</strong> <span>{user.lastDiagnosisDate}</span>
          </div>

          <div className="profile-actions">
            <button onClick={handleEditClick} className="profile-button">
              Profili Düzenle
            </button>
            <button onClick={handleLogout} className="profile-button logout">
              Çıkış Yap
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;