from flask import Flask, request, jsonify
from flask_cors import CORS 
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import os
import json


app = Flask(__name__)
CORS(app)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
MODEL_PATH = 'model.h5'
DISEASE_INFO_PATH = 'hastalik_bilgi.json'


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def load_ai_model():
    try:
        model = load_model(MODEL_PATH)
        print("Yapay zeka modeli başarıyla yüklendi.")
        return model
    except Exception as e:
        print(f"HATA: Yapay zeka modeli yüklenemedi. Lütfen '{MODEL_PATH}' dosyasını kontrol edin. Hata: {e}")
        return None

def load_disease_details():
    try:
        with open(DISEASE_INFO_PATH, 'r', encoding='utf-8') as f:
            details = json.load(f)
        print("Hastalık detayları başarıyla yüklendi.")
        return details
    except FileNotFoundError:
        print(f"UYARI: '{DISEASE_INFO_PATH}' bulunamadı. Hastalık açıklamaları genel olacaktır.")
        return {}
    except json.JSONDecodeError:
        print(f"HATA: '{DISEASE_INFO_PATH}' dosyasında JSON ayrıştırma hatası. Formatı kontrol edin.")
        return {}


model = load_ai_model()
class_names = ['akiec', 'bbc', 'bkl', 'df', 'mel', 'nv', 'vasc']
disease_details = load_disease_details()

def model_predict(file_stream):
    """Yüklenen görsel üzerinde model tahmini yapar ve sonuçları döndürür."""
    if model is None:
        raise Exception("Yapay zeka modeli yüklenemediği için tahmin yapılamıyor.")

    
    img = Image.open(file_stream).resize((64, 64)) 
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)[0]
    
    top_prediction_index = np.argmax(predictions)
    top_disease_code = class_names[top_prediction_index]
    top_confidence = float(predictions[top_prediction_index])

    main_prediction_info = disease_details.get(top_disease_code, {
        "name": top_disease_code.upper(),
        "description": "Bu cilt rahatsızlığı hakkında detaylı bilgi bulunamadı. Genel bir açıklama.",
        "recommendations": "Doğru teşhis ve tedavi için lütfen bir dermatoloğa danışın."
    })

    main_result = {
        "disease_code": top_disease_code,
        "disease_name": main_prediction_info.get("name"),
        "confidence": top_confidence,
        "description": main_prediction_info.get("description"),
        "recommendations": main_prediction_info.get("recommendations")
    }

    sorted_indices = predictions.argsort()[::-1]
    other_predictions = []
    for idx in sorted_indices:
        if idx == top_prediction_index:
            continue
        
        disease_code = class_names[idx]
        confidence = float(predictions[idx])
        
        if confidence > 0.01:
            other_info = disease_details.get(disease_code, {"name": disease_code.upper()})
            other_predictions.append({
                "disease_code": disease_code,
                "disease_name": other_info.get("name"),
                "confidence": confidence
            })
    
    return {
        "main_prediction": main_result,
        "other_predictions": other_predictions
    }


@app.route('/upload', methods=['POST'])
def upload_file():
    if model is None:
        return jsonify({"error": "Sunucu şu an hazır değil: Yapay zeka modeli yüklenemedi."}), 503

    if 'file' not in request.files:
        return jsonify({"error": "Dosya yüklenmedi. Lütfen bir fotoğraf seçin."}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "Dosya seçilmedi. Lütfen bir fotoğraf seçin."}), 400

    if file and allowed_file(file.filename):
        try:
            predictions_result = model_predict(file.stream)
            return jsonify(predictions_result)
        except Exception as e:
            print(f"Tahmin sırasında hata oluştu: {e}")
            return jsonify({"error": f"Görüntü işlenirken veya teşhis yapılırken bir hata oluştu: {str(e)}"}), 500
    else:
        return jsonify({"error": "Geçersiz dosya türü. Sadece PNG, JPG, JPEG veya GIF resim dosyaları kabul edilir."}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)