import pandas as pd
import numpy as np
import joblib
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from imblearn.over_sampling import SMOTE
from preprocessing import TextPreprocessor

# Configuration
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
MODELS_DIR = os.path.join(BASE_DIR, "models")
SLANGWORD_PATH = os.path.join(DATA_DIR, "Slangword.csv")
RANDOM_STATE = 42
TEST_SIZE = 0.3  # 30% test, 70% train - sesuai dengan notebook


def train_and_save():
    print("=" * 60)
    print("STARTING MODEL TRAINING PIPELINE")
    print("=" * 60)
    print("\nKonfigurasi sesuai dengan eksperimen notebook:")
    print("  - Normal: ngram_range=(1,2), min_df=2, max_df=0.95")
    print("  - Tanpa Netral: ngram_range=(1,3), min_df=2, max_df=0.95")
    print("  - SMOTE: ngram_range=(1,2), split -> SMOTE train only")
    print("  - Back-translation: ngram_range=(1,3), min_df=2, max_df=0.95")

    # Initialize Preprocessor
    preprocessor = TextPreprocessor(SLANGWORD_PATH)

    # Load Main Dataset
    print("\n[INFO] Loading Dataset Label...")
    df_main = pd.read_excel(os.path.join(DATA_DIR, "Dataset_Label.xlsx"))
    print(f"[INFO] Dataset loaded: {len(df_main)} rows")

    # Preprocess Main Dataset
    print("[INFO] Preprocessing Main Dataset...")
    df_main['cleaned'] = df_main['full_text'].apply(preprocessor.preprocess)

    # =========================================================================
    # 1. MODEL BASELINE (Normal)
    # Sesuai dengan Normal.ipynb: ngram_range=(1,2), min_df=2, max_df=0.95
    # =========================================================================
    print("\n" + "=" * 60)
    print("[TRAINING] 1. Baseline Model (Normal)")
    print("=" * 60)
    print("Config: ngram_range=(1,2), max_features=5000, min_df=2, max_df=0.95")

    vectorizer_normal = TfidfVectorizer(
        ngram_range=(1, 2),  # Sesuai Normal.ipynb Cell 9 output
        max_features=5000,
        min_df=2,
        max_df=0.95
    )
    X_normal = vectorizer_normal.fit_transform(df_main['cleaned'])
    y_normal = df_main['Label']

    # Train/Test Split 70/30 - sesuai notebook
    X_train_normal, X_test_normal, y_train_normal, y_test_normal = train_test_split(
        X_normal, y_normal,
        test_size=TEST_SIZE,
        random_state=RANDOM_STATE,
        stratify=y_normal
    )

    print(f"[INFO] TF-IDF Shape: {X_normal.shape}")
    print(f"[INFO] Train samples: {X_train_normal.shape[0]}, Test samples: {X_test_normal.shape[0]}")

    model_normal = LogisticRegression(max_iter=1000, random_state=RANDOM_STATE)
    model_normal.fit(X_train_normal, y_train_normal)

    # Evaluate on test set
    acc_normal = model_normal.score(X_test_normal, y_test_normal)
    print(f"[INFO] Test Accuracy: {acc_normal:.4f}")

    joblib.dump(model_normal, os.path.join(MODELS_DIR, "model_normal.pkl"))
    joblib.dump(vectorizer_normal, os.path.join(MODELS_DIR, "vectorizer_normal.pkl"))
    print("[OK] Baseline Model Saved.")

    # =========================================================================
    # 2. MODEL TANPA NETRAL (Binary Classification)
    # Sesuai dengan Tanpa_Netral.ipynb: ngram_range=(1,3), filter Label != 1
    # =========================================================================
    print("\n" + "=" * 60)
    print("[TRAINING] 2. No Neutral Model (Binary Classification)")
    print("=" * 60)
    print("Config: ngram_range=(1,3), max_features=5000, min_df=2, max_df=0.95")
    print("Filter: Exclude Label 1 (Netral)")

    # Filter out Netral class (Label 1)
    df_no_neutral = df_main[df_main['Label'] != 1].copy()
    print(f"[INFO] Dataset after filter: {len(df_no_neutral)} rows (removed {len(df_main) - len(df_no_neutral)} Netral)")

    vectorizer_nn = TfidfVectorizer(
        ngram_range=(1, 3),  # Sesuai Tanpa_Netral.ipynb Cell 9 output
        max_features=5000,
        min_df=2,
        max_df=0.95
    )
    X_nn = vectorizer_nn.fit_transform(df_no_neutral['cleaned'])
    y_nn = df_no_neutral['Label']

    # Train/Test Split 70/30
    X_train_nn, X_test_nn, y_train_nn, y_test_nn = train_test_split(
        X_nn, y_nn,
        test_size=TEST_SIZE,
        random_state=RANDOM_STATE,
        stratify=y_nn
    )

    print(f"[INFO] TF-IDF Shape: {X_nn.shape}")
    print(f"[INFO] Train samples: {X_train_nn.shape[0]}, Test samples: {X_test_nn.shape[0]}")

    model_nn = LogisticRegression(max_iter=1000, random_state=RANDOM_STATE)
    model_nn.fit(X_train_nn, y_train_nn)

    # Evaluate on test set
    acc_nn = model_nn.score(X_test_nn, y_test_nn)
    print(f"[INFO] Test Accuracy: {acc_nn:.4f}")

    joblib.dump(model_nn, os.path.join(MODELS_DIR, "model_no_neutral.pkl"))
    joblib.dump(vectorizer_nn, os.path.join(MODELS_DIR, "vectorizer_no_neutral.pkl"))
    print("[OK] No Neutral Model Saved.")

    # =========================================================================
    # 3. MODEL SMOTE
    # Sesuai dengan Dengan_Smote.ipynb:
    # - ngram_range=(1,2), Split SEBELUM SMOTE, SMOTE hanya pada training data
    # =========================================================================
    print("\n" + "=" * 60)
    print("[TRAINING] 3. SMOTE Model")
    print("=" * 60)
    print("Config: ngram_range=(1,2), max_features=5000, min_df=2, max_df=0.95")
    print("PENTING: Split data SEBELUM SMOTE, SMOTE hanya pada training data")

    # Menggunakan vectorizer yang sama dengan Normal (ngram_range=(1,2))
    # karena di notebook SMOTE juga menggunakan (1,2)
    vectorizer_smote = TfidfVectorizer(
        ngram_range=(1, 2),  # Sesuai Dengan_Smote.ipynb Cell 9 output
        max_features=5000,
        min_df=2,
        max_df=0.95
    )
    X_smote_all = vectorizer_smote.fit_transform(df_main['cleaned'])
    y_smote_all = df_main['Label']

    # Split SEBELUM SMOTE - sangat penting untuk menghindari data leakage
    X_train_pre_smote, X_test_smote, y_train_pre_smote, y_test_smote = train_test_split(
        X_smote_all, y_smote_all,
        test_size=TEST_SIZE,
        random_state=RANDOM_STATE,
        stratify=y_smote_all
    )

    print(f"[INFO] Train samples SEBELUM SMOTE: {X_train_pre_smote.shape[0]}")
    print(f"[INFO] Test samples (original): {X_test_smote.shape[0]}")

    # Apply SMOTE hanya pada training data
    smote = SMOTE(random_state=RANDOM_STATE)
    X_train_smote, y_train_smote = smote.fit_resample(X_train_pre_smote, y_train_pre_smote)

    print(f"[INFO] Train samples SESUDAH SMOTE: {X_train_smote.shape[0]}")
    print(f"[INFO] Synthetic samples added: {X_train_smote.shape[0] - X_train_pre_smote.shape[0]}")

    model_smote = LogisticRegression(max_iter=1000, random_state=RANDOM_STATE)
    model_smote.fit(X_train_smote, y_train_smote)

    # Evaluate on ORIGINAL test set (tidak diaugmentasi)
    acc_smote = model_smote.score(X_test_smote, y_test_smote)
    print(f"[INFO] Test Accuracy: {acc_smote:.4f}")

    joblib.dump(model_smote, os.path.join(MODELS_DIR, "model_smote.pkl"))
    joblib.dump(vectorizer_smote, os.path.join(MODELS_DIR, "vectorizer_smote.pkl"))
    print("[OK] SMOTE Model Saved.")

    # =========================================================================
    # 4. MODEL BACKTRANSLATION
    # Sesuai dengan _backstranslation.ipynb:
    # - ngram_range=(1,3), Dataset sudah diaugmentasi sebelumnya
    # =========================================================================
    print("\n" + "=" * 60)
    print("[TRAINING] 4. Backtranslation Model")
    print("=" * 60)
    print("Config: ngram_range=(1,3), max_features=5000, min_df=2, max_df=0.95")
    print("[INFO] Loading Augmented Dataset...")

    df_bt = pd.read_excel(os.path.join(DATA_DIR, "Dataset_Backtranslation.xlsx"))

    # Detect column names
    text_col_bt = 'full_text' if 'full_text' in df_bt.columns else df_bt.columns[0]
    label_col_bt = 'Label' if 'Label' in df_bt.columns else df_bt.columns[1]

    print(f"[INFO] Using text column: '{text_col_bt}'")
    print(f"[INFO] Using label column: '{label_col_bt}'")
    print(f"[INFO] Augmented dataset size: {len(df_bt)} rows")

    # Preprocess
    df_bt['cleaned'] = df_bt[text_col_bt].apply(preprocessor.preprocess)

    vectorizer_bt = TfidfVectorizer(
        ngram_range=(1, 3),  # Sesuai _backstranslation.ipynb Cell 11 output
        max_features=5000,
        min_df=2,
        max_df=0.95
    )
    X_bt = vectorizer_bt.fit_transform(df_bt['cleaned'])
    y_bt = df_bt[label_col_bt]

    print(f"[INFO] TF-IDF Shape: {X_bt.shape}")

    # Dataset BT sudah merupakan training data yang diaugmentasi
    # Sesuai notebook, kita fit pada semua data augmented
    model_bt = LogisticRegression(max_iter=1000, random_state=RANDOM_STATE)
    model_bt.fit(X_bt, y_bt)

    joblib.dump(model_bt, os.path.join(MODELS_DIR, "model_bt.pkl"))
    joblib.dump(vectorizer_bt, os.path.join(MODELS_DIR, "vectorizer_bt.pkl"))
    print("[OK] Backtranslation Model Saved.")

    # =========================================================================
    # SUMMARY
    # =========================================================================
    print("\n" + "=" * 60)
    print("TRAINING SUMMARY")
    print("=" * 60)
    print(f"{'Model':<20} {'N-Gram':<12} {'Train Samples':<15} {'Test Accuracy':<15}")
    print("-" * 60)
    print(f"{'Normal':<20} {'(1,2)':<12} {X_train_normal.shape[0]:<15} {acc_normal:.4f}")
    print(f"{'Tanpa Netral':<20} {'(1,3)':<12} {X_train_nn.shape[0]:<15} {acc_nn:.4f}")
    print(f"{'SMOTE':<20} {'(1,2)':<12} {X_train_smote.shape[0]:<15} {acc_smote:.4f}")
    print(f"{'Back-translation':<20} {'(1,3)':<12} {X_bt.shape[0]:<15} {'N/A (full train)'}")
    print("=" * 60)

    print("\n[OK] ALL MODELS TRAINED AND SAVED SUCCESSFULLY")
    print("\nSaved files:")
    print("  - model_normal.pkl, vectorizer_normal.pkl")
    print("  - model_no_neutral.pkl, vectorizer_no_neutral.pkl")
    print("  - model_smote.pkl, vectorizer_smote.pkl")
    print("  - model_bt.pkl, vectorizer_bt.pkl")


if __name__ == "__main__":
    try:
        train_and_save()
    except Exception as e:
        print(f"\n[CRITICAL ERROR] {e}")
        import traceback
        traceback.print_exc()
