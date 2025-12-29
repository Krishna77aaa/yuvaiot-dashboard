from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route('/api/data/ir')
def get_ir_data():
    percentage = random.randint(0, 100)
    return jsonify({'percentage': percentage})

@app.route('/api/data/smartlock')
def get_smartlock_data():
    percentage = random.randint(0, 100)
    return jsonify({'percentage': percentage})

@app.route('/api/data/doorbell')
def get_doorbell_data():
    percentage = random.randint(0, 100)
    return jsonify({'percentage': percentage})

if __name__ == '__main__':
    app.run(debug=True)