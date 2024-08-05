from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/make-a-prediction',methods=["POST"])
def predict_query():
    print("Prediction Made.")

if __name__ == '__main__':
    app.run(debug=True)