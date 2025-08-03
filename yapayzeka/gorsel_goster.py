import pandas as pd
import matplotlib.pyplot as plt
import os
from PIL import Image

df = pd.read_csv("HAM10000_metadata.csv")

nv_df = df[df['dx'] == 'nv'].head(5)


for idx, row in nv_df.iterrows():
    image_id = row['image_id']
    for folder in ['ham1', 'ham2']:
        image_path = os.path.join(folder, image_id + ".jpg")
        if os.path.exists(image_path):
            img = Image.open(image_path)
            plt.imshow(img)
            plt.title(f"Label: {row['dx']} | Age: {row['age']} | Sex: {row['sex']}")
            plt.axis('off')
            plt.show()
            break
