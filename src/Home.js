import React, { useState } from 'react';
import axios from 'axios';
import './Home.css'; 

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); 
      setDiagnosisResult(null); 
      setError(null); 
    } else {
      setPreviewImage(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Lütfen bir fotoğraf seçin.");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile); 

    setLoading(true); 
    setError(null); 
    setDiagnosisResult(null); 

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' 
        }
      });

      setDiagnosisResult(response.data);

    } catch (err) {
      console.error('Yükleme hatası:', err);

      if (err.response) {
    
        setError(`Hata: ${err.response.data.error || "Sunucudan bilinmeyen bir hata oluştu."}`);
      } else if (err.request) {

        setError("Sunucuya ulaşılamıyor. Backend çalışıyor mu kontrol edin?");
      } else {

        setError("Fotoğraf yüklenirken beklenmeyen bir hata oluştu.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Cilt Sağlığınızı Kontrol Edin</h1>
          <p>
            Yapay zeka destekli platformumuzla cilt problemleriniz hakkında hızlı ve güvenilir ön teşhis alın. Tek yapmanız gereken bir fotoğraf yüklemek!
          </p>

        </div>
      </section>

      <section className="upload-section">
        <h2>Cilt Teşhisi İçin Görsel Yükleyin</h2>
        <input
          type="file"
          accept="image/*" 
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="imageUpload"
        />
        <label
          htmlFor="imageUpload"
          className="file-input-label"
        >
          Fotoğraf Seç
        </label>
        {selectedFile && (
          <p className="selected-file-name">Seçilen Dosya: <strong>{selectedFile.name}</strong></p>
        )}
        {previewImage && (
          <div className="preview-image-container">
            <h3>Seçilen Görsel Önizlemesi:</h3>
            <img
              src={previewImage}
              alt="Görsel Önizleme"
              className="preview-image"
            />
          </div>
        )}
        <button
          onClick={handleUpload}
          disabled={!selectedFile || loading}
          className="upload-button"
        >
          {loading ? 'Yükleniyor...' : 'Teşhis İçin Yükle'}
        </button>
      </section>


      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {diagnosisResult && diagnosisResult.main_prediction && (
        <div className="diagnosis-result-container">
          <h3 className="diagnosis-result-title">En Yüksek Tahmin:</h3>
          <p><strong>Rahatsızlık:</strong> {diagnosisResult.main_prediction.disease_name}</p>
          <p><strong>Güvenilirlik:</strong> {(diagnosisResult.main_prediction.confidence * 100).toFixed(2)}%</p>
          <p><strong>Açıklama:</strong> {diagnosisResult.main_prediction.description}</p>
          <p><strong>Öneriler:</strong> {diagnosisResult.main_prediction.recommendations}</p>


          {diagnosisResult.other_predictions && diagnosisResult.other_predictions.length > 0 && (
            <>
              <h4 className="other-predictions-title">Diğer Olası Tahminler:</h4>
              <ul>
                {diagnosisResult.other_predictions.map((pred, index) => (
                  <li key={index}>
                    <strong>{pred.disease_name}:</strong> {(pred.confidence * 100).toFixed(2)}%
                  </li>
                ))}
              </ul>
            </>
          )}
          <p className="medical-disclaimer">
            **Önemli Not:** Bu platform tıbbi teşhis koymaz. Sunulan bilgiler ön bilgilendirme amaçlıdır ve profesyonel bir dermatolog muayenesinin yerine geçmez. Doğru teşhis ve tedavi için mutlaka bir uzmana danışın.
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;