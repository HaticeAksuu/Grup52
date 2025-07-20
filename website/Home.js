import React, { useState } from 'react';
// import axios from 'axios'; 
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
      alert("Lütfen bir fotoğraf seçin.");
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    setLoading(true);
    setError(null);

    try {
     
      await new Promise(resolve => setTimeout(resolve, 2000)); 

      setDiagnosisResult({
        message: 'Fotoğraf başarıyla yüklendi ve yapay zeka işleme aşamasında (Simülasyon).',
        fileName: selectedFile.name,
        predictedDisease: 'Örnek Cilt Rahatsızlığı (Simülasyon)',
        confidence: '90%',
        recommendations: 'Bir uzmana danışmanız önerilir.',
        simulated: true
      });

    } catch (err) {
      console.error('Yükleme hatası (simülasyon):', err);
      setError("Fotoğraf yüklenirken veya teşhis alınırken bir hata oluştu (Simülasyon). Lütfen tekrar deneyin.");
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
          <button className="learn-more-button">Daha Fazla Bilgi Edinin</button>
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
              alt="Önizleme"
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
          <p>Hata: {error}</p>
        </div>
      )}

      {diagnosisResult && (
        <div className="diagnosis-result-container">
          <h3 className="diagnosis-result-title">Teşhis Sonucu:</h3>
          {diagnosisResult.simulated ? (
              <>
                <p><strong>Mesaj:</strong> {diagnosisResult.message}</p>
                <p><strong>Yüklenen Dosya:</strong> {diagnosisResult.fileName}</p>
                <p><strong>Tahmini Rahatsızlık:</strong> {diagnosisResult.predictedDisease}</p>
                <p><strong>Güvenilirlik:</strong> {diagnosisResult.confidence}</p>
                <p><strong>Öneriler:</strong> {diagnosisResult.recommendations}</p>
              </>
          ) : (
              <pre>{JSON.stringify(diagnosisResult, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;