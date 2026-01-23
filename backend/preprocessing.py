import pandas as pd
import re
import string
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory
from Sastrawi.StopWordRemover.StopWordRemoverFactory import StopWordRemoverFactory

def load_slangword(filepath):
    """Memuat kamus slangword dari CSV"""
    try:
        df = pd.read_csv(filepath)
        slang_dict = dict(zip(df['slang'].str.lower(), df['formal'].str.lower()))
        print(f"[INFO] Loaded {len(slang_dict)} slangwords from {filepath}")
        return slang_dict
    except Exception as e:
        print(f"[ERROR] Gagal memuat slangword: {e}")
        return {}

def cleaning(text):
    if pd.isna(text): return ""
    text = str(text)
    text = re.sub(r'http\S+|www\.\S+', '', text)
    text = re.sub(r'@\w+', '', text)
    text = re.sub(r'#\w+', '', text)
    text = re.sub(r'\d+', '', text)
    text = re.sub(r'[^\x00-\x7F]+', '', text)
    text = text.translate(str.maketrans('', '', string.punctuation))
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def case_folding(text):
    return text.lower() if text else ""

def tokenization(text):
    return text.split() if text else []

def normalization(tokens, slang_dict):
    return [slang_dict.get(t, t) for t in tokens]

def stopword_removal(tokens, stopword_remover):
    text = ' '.join(tokens)
    result = stopword_remover.remove(text)
    return result.split() if result else []

def stemming(tokens, stemmer):
    return [stemmer.stem(t) for t in tokens]

class TextPreprocessor:
    def __init__(self, slangword_path):
        self.slang_dict = load_slangword(slangword_path)
        self.stemmer = StemmerFactory().create_stemmer()
        self.stopword_remover = StopWordRemoverFactory().create_stop_word_remover()

    def preprocess(self, text):
        # 1. Cleaning
        text = cleaning(text)
        # 2. Case Folding
        text = case_folding(text)
        # 3. Tokenization
        tokens = tokenization(text)
        # 4. Normalization
        tokens = normalization(tokens, self.slang_dict)
        # 5. Stopword Removal
        tokens = stopword_removal(tokens, self.stopword_remover)
        # 6. Stemming
        tokens = stemming(tokens, self.stemmer)
        
        return " ".join(tokens)
