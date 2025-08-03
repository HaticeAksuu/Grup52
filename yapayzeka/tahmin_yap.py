import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image


model = load_model("model.h5")


labels = ['akne', 'bkl', 'melanoma', 'nv', 'df', 'vasc', 'bcc']  


img_path = "dd.jpg"  


img = image.load_img(img_path, target_size=(64, 64))
img_array = image.img_to_array(img) / 255.0
img_array = np.expand_dims(img_array, axis=0)

# Tahmin yap
prediction = model.predict(img_array)
predicted_class = np.argmax(prediction)

print(f"Tahmin edilen sınıf: {labels[predicted_class]}")
