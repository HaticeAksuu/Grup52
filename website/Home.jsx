
import React from 'react';

function Home() {
  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#007bff' }}>Cilt Sağlığınızı Koruyun</h1>
      <p style={{ fontSize: 18, color: '#333' }}>
        Yapay zeka destekli cilt hastalığı ön teşhisi ve bilgilendirme platformuna hoş geldiniz. 
        Fotoğraf yükleyerek cilt problemleriniz hakkında ön bilgi alabilirsiniz.
      </p>
      {/* İstersen buton, görsel veya diğer içerikler ekleyebilirsin */}
    </div>
  );
}

export default Home;
