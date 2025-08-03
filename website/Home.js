import React, { useState } from 'react';
// import axios from 'axios'; 
import './Home.css';

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



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
