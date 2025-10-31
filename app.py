from flask import Flask, render_template, jsonify, request
import os

app = Flask(__name__)
score = 0

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/click", methods=["POST"])
def click():
    global score
    score += 1
    return jsonify({"score": score})

@app.route("/reset", methods=["POST"])
def reset():
    global score
    score = 0
    return jsonify({"score": score})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)