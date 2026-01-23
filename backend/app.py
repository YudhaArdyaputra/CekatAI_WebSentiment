from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
from preprocessing import TextPreprocessor

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "models")
DATA_DIR = os.path.join(BASE_DIR, "data")
SLANGWORD_PATH = os.path.join(DATA_DIR, "Slangword.csv")

# Global variables for models
models = {}
vectorizers = {}
preprocessor = None

# Model configurations - sesuai dengan eksperimen notebook
MODEL_CONFIG = {
    'normal': {
        'model_file': 'model_normal.pkl',
        'vectorizer_file': 'vectorizer_normal.pkl',
        'description': 'Baseline Model (ngram_range=(1,2))',
        'classes': {0: 'Negatif', 1: 'Netral', 2: 'Positif'}
    },
    'no_neutral': {
        'model_file': 'model_no_neutral.pkl',
        'vectorizer_file': 'vectorizer_no_neutral.pkl',
        'description': 'Binary Classification (ngram_range=(1,3))',
        'classes': {0: 'Negatif', 2: 'Positif'}  # No class 1
    },
    'smote': {
        'model_file': 'model_smote.pkl',
        'vectorizer_file': 'vectorizer_smote.pkl',  # Sekarang punya vectorizer sendiri
        'description': 'SMOTE Augmented (ngram_range=(1,2))',
        'classes': {0: 'Negatif', 1: 'Netral', 2: 'Positif'}
    },
    'bt': {
        'model_file': 'model_bt.pkl',
        'vectorizer_file': 'vectorizer_bt.pkl',
        'description': 'Back-translation Augmented (ngram_range=(1,3))',
        'classes': {0: 'Negatif', 1: 'Netral', 2: 'Positif'}
    }
}


def load_models():
    """Load all models and vectorizers at startup"""
    global models, vectorizers, preprocessor

    # Load Preprocessor
    print("[INFO] Loading Preprocessor...")
    preprocessor = TextPreprocessor(SLANGWORD_PATH)

    # Load Models & Vectorizers
    print("[INFO] Loading Models and Vectorizers...")

    for model_key, config in MODEL_CONFIG.items():
        try:
            model_path = os.path.join(MODELS_DIR, config['model_file'])
            vec_path = os.path.join(MODELS_DIR, config['vectorizer_file'])

            if os.path.exists(model_path) and os.path.exists(vec_path):
                models[model_key] = joblib.load(model_path)
                vectorizers[model_key] = joblib.load(vec_path)
                print(f"  [OK] Loaded {model_key}: {config['description']}")
            else:
                print(f"  [WARN] Files not found for {model_key}")
                if not os.path.exists(model_path):
                    print(f"         Missing: {config['model_file']}")
                if not os.path.exists(vec_path):
                    print(f"         Missing: {config['vectorizer_file']}")

        except Exception as e:
            print(f"  [ERROR] Failed to load {model_key}: {e}")

    print(f"\n[INFO] Loaded {len(models)} models successfully")


# Load models at startup
load_models()


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "models_loaded": list(models.keys()),
        "model_details": {
            key: MODEL_CONFIG[key]['description']
            for key in models.keys()
        }
    })


@app.route('/models', methods=['GET'])
def list_models():
    """List all available models with their configurations"""
    available = {}
    for key in models.keys():
        available[key] = {
            'description': MODEL_CONFIG[key]['description'],
            'classes': MODEL_CONFIG[key]['classes']
        }
    return jsonify({
        "available_models": available,
        "total": len(models)
    })


@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict sentiment for input text
    
    Request body:
    {
        "text": "Input text to analyze",
        "model": "normal" | "smote" | "bt" | "no_neutral"
    }
    """
    try:
        data = request.json
        text = data.get('text', '')
        model_type = data.get('model', 'normal')

        # Validation
        if not text:
            return jsonify({"error": "No text provided"}), 400

        if model_type not in models:
            return jsonify({
                "error": f"Invalid model type '{model_type}'",
                "available_models": list(models.keys())
            }), 400

        # 1. Preprocess text
        cleaned_text = preprocessor.preprocess(text)

        if not cleaned_text.strip():
            return jsonify({
                "error": "Text is empty after preprocessing",
                "original_text": text
            }), 400

        # 2. Vectorize using the model's specific vectorizer
        vectorizer = vectorizers[model_type]
        vector = vectorizer.transform([cleaned_text])

        # 3. Predict
        model = models[model_type]
        prediction = model.predict(vector)[0]
        probabilities = model.predict_proba(vector)[0]

        # 4. Map prediction to label
        label_map = MODEL_CONFIG[model_type]['classes']
        sentiment = label_map.get(prediction, "Unknown")

        # 5. Calculate confidence (max probability)
        confidence = float(max(probabilities) * 100)

        # 6. Get probability for each class
        class_probabilities = {}
        for idx, prob in enumerate(probabilities):
            class_label = model.classes_[idx]
            class_name = label_map.get(class_label, f"Class {class_label}")
            class_probabilities[class_name] = round(prob * 100, 2)

        return jsonify({
            "text": text,
            "cleaned_text": cleaned_text,
            "sentiment": sentiment,
            "confidence": f"{confidence:.2f}",
            "model_used": model_type,
            "model_description": MODEL_CONFIG[model_type]['description'],
            "probabilities": class_probabilities
        })

    except Exception as e:
        print(f"Prediction Error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route('/predict_all', methods=['POST'])
def predict_all():
    """
    Predict sentiment using all 4 experiment models
    
    Request body:
    {
        "text": "Input text to analyze"
    }
    
    Returns predictions from all 4 models: normal, smote, bt, no_neutral
    """
    try:
        data = request.json
        text = data.get('text', '')

        # Validation
        if not text:
            return jsonify({"error": "No text provided"}), 400

        # 1. Preprocess text (once for all models)
        cleaned_text = preprocessor.preprocess(text)

        if not cleaned_text.strip():
            return jsonify({
                "error": "Text is empty after preprocessing",
                "original_text": text
            }), 400

        # 2. Run predictions on all models
        all_results = {}
        model_order = ['normal', 'smote', 'bt', 'no_neutral']  # Define order
        
        for model_type in model_order:
            if model_type not in models:
                continue
                
            try:
                # Vectorize using the model's specific vectorizer
                vectorizer = vectorizers[model_type]
                vector = vectorizer.transform([cleaned_text])

                # Predict
                model = models[model_type]
                prediction = model.predict(vector)[0]
                probabilities = model.predict_proba(vector)[0]

                # Map prediction to label
                label_map = MODEL_CONFIG[model_type]['classes']
                sentiment = label_map.get(prediction, "Unknown")

                # Calculate confidence (max probability)
                confidence = float(max(probabilities) * 100)

                # Get probability for each class
                class_probabilities = {}
                for idx, prob in enumerate(probabilities):
                    class_label = model.classes_[idx]
                    class_name = label_map.get(class_label, f"Class {class_label}")
                    class_probabilities[class_name] = round(prob * 100, 2)

                all_results[model_type] = {
                    "sentiment": sentiment,
                    "confidence": f"{confidence:.2f}",
                    "model_description": MODEL_CONFIG[model_type]['description'],
                    "probabilities": class_probabilities
                }
                
            except Exception as e:
                print(f"Error predicting with {model_type}: {e}")
                all_results[model_type] = {
                    "error": str(e)
                }

        return jsonify({
            "text": text,
            "cleaned_text": cleaned_text,
            "results": all_results
        })

    except Exception as e:
        print(f"Prediction Error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route('/batch_predict', methods=['POST'])
def batch_predict():
    """
    Predict sentiment for multiple texts
    
    Request body:
    {
        "texts": ["text1", "text2", ...],
        "model": "normal" | "smote" | "bt" | "no_neutral"
    }
    """
    try:
        data = request.json
        texts = data.get('texts', [])
        model_type = data.get('model', 'normal')

        if not texts:
            return jsonify({"error": "No texts provided"}), 400

        if model_type not in models:
            return jsonify({
                "error": f"Invalid model type '{model_type}'",
                "available_models": list(models.keys())
            }), 400

        results = []
        label_map = MODEL_CONFIG[model_type]['classes']
        vectorizer = vectorizers[model_type]
        model = models[model_type]

        for text in texts:
            cleaned_text = preprocessor.preprocess(text)

            if cleaned_text.strip():
                vector = vectorizer.transform([cleaned_text])
                prediction = model.predict(vector)[0]
                probabilities = model.predict_proba(vector)[0]
                confidence = float(max(probabilities) * 100)
                sentiment = label_map.get(prediction, "Unknown")
            else:
                sentiment = "Unknown"
                confidence = 0.0
                cleaned_text = ""

            results.append({
                "text": text,
                "cleaned_text": cleaned_text,
                "sentiment": sentiment,
                "confidence": f"{confidence:.2f}"
            })

        return jsonify({
            "model_used": model_type,
            "total_processed": len(results),
            "results": results
        })

    except Exception as e:
        print(f"Batch Prediction Error: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    print("\n" + "=" * 60)
    print("CEKATAI SENTIMENT ANALYSIS API")
    print("=" * 60)
    print("Models configuration (sesuai eksperimen notebook):")
    print("  - normal: Baseline, ngram_range=(1,2)")
    print("  - no_neutral: Binary, ngram_range=(1,3)")
    print("  - smote: SMOTE Augmented, ngram_range=(1,2)")
    print("  - bt: Back-translation, ngram_range=(1,3)")
    print("=" * 60 + "\n")
    app.run(debug=True, port=5000)
