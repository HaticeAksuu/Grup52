import os
import shutil
import pandas as pd
from sklearn.model_selection import train_test_split

df = pd.read_csv("HAM10000_metadata.csv")


image_dirs = ['ham1', 'ham2']


for split in ['train', 'val']:
    for label in df['dx'].unique():
        dir_path = os.path.join(split, label)
        os.makedirs(dir_path, exist_ok=True)


train_df, val_df = train_test_split(df, test_size=0.2, stratify=df['dx'], random_state=42)

def copy_images(dataframe, split):
    for _, row in dataframe.iterrows():
        image_id = row['image_id'] + '.jpg'
        label = row['dx']
        src_path = None

        for d in image_dirs:
            potential_path = os.path.join(d, image_id)
            if os.path.exists(potential_path):
                src_path = potential_path
                break

        if src_path is None:
            print(f"Dosya bulunamadı: {image_id}")
            continue

        dst_path = os.path.join(split, label, image_id)
        shutil.copyfile(src_path, dst_path)


copy_images(train_df, 'train')
copy_images(val_df, 'val')

print("Görseller klasörlere ayrıldı.")
