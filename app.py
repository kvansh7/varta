from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline, MarianMTModel, MarianTokenizer

app = Flask(__name__)
CORS(app)

# Load NER models for English and Hindi
ner_english = pipeline("ner", model="dbmdz/bert-large-cased-finetuned-conll03-english")
ner_hindi = pipeline("ner", model="Davlan/xlm-roberta-base-ner-hrl")

# Load translation models for both directions
model_name_hi_en = 'Helsinki-NLP/opus-mt-hi-en'
model_name_en_hi = 'Helsinki-NLP/opus-mt-en-hi'

tokenizer_hi_en = MarianTokenizer.from_pretrained(model_name_hi_en)
translation_model_hi_en = MarianMTModel.from_pretrained(model_name_hi_en)

tokenizer_en_hi = MarianTokenizer.from_pretrained(model_name_en_hi)
translation_model_en_hi = MarianMTModel.from_pretrained(model_name_en_hi)

def translate(text, tokenizer, model):
    tokenized_text = tokenizer.prepare_seq2seq_batch([text], return_tensors="pt")
    translated = model.generate(**tokenized_text)
    return tokenizer.decode(translated[0], skip_special_tokens=True)

def ner_based_translation(text, ner_pipeline, tokenizer, model, allowed_entities=["PERSON", "ORG", "LOC"]):
    entities = ner_pipeline(text)
    placeholders = {}

    for entity in entities:
        if entity['entity'] in allowed_entities:
            placeholder = f"<{entity['entity']}>"
            text = text.replace(entity['word'], placeholder)
            placeholders[placeholder] = entity['word']

    translated_text = translate(text, tokenizer, model)

    for placeholder, original in placeholders.items():
        translated_text = translated_text.replace(placeholder, original)

    return translated_text

@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.json
    text = data['text']
    direction = data['direction']

    if direction == 'hi_to_en':
        result = ner_based_translation(text, ner_hindi, tokenizer_hi_en, translation_model_hi_en)
    elif direction == 'en_to_hi':
        result = ner_based_translation(text, ner_english, tokenizer_en_hi, translation_model_en_hi)
    else:
        return jsonify({'error': 'Invalid translation direction'}), 400

    return jsonify({'translated_text': result})

@app.route('/languages', methods=['GET'])
def get_languages():
    languages = {
        "hi_to_en": "Hindi to English",
        "en_to_hi": "English to Hindi"
    }
    return jsonify(languages)

if __name__ == '__main__':
    app.run(debug=True)