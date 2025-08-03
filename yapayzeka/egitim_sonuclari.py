import pickle
import matplotlib.pyplot as plt

with open('history.pkl', 'rb') as f:
    history = pickle.load(f)



plt.figure(figsize=(10, 4))

plt.subplot(1, 2, 1)
plt.plot(history['accuracy'], label='Eğitim Doğruluğu')
plt.plot(history['val_accuracy'], label='Doğrulama Doğruluğu')
plt.title('Doğruluk (Accuracy)')
plt.xlabel('Epoch')
plt.ylabel('Doğruluk')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(history['loss'], label='Eğitim Kaybı')
plt.plot(history['val_loss'], label='Doğrulama Kaybı')
plt.title('Kayıp (Loss)')
plt.xlabel('Epoch')
plt.ylabel('Kayıp')
plt.legend()

plt.tight_layout()
plt.show()
