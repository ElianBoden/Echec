from flask import Flask, render_template, jsonify, request
import os
import chess

app = Flask(__name__)
game = chess.Board()  # Python-chess library handles rules

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/move", methods=["POST"])
def move():
    data = request.get_json()
    source = data.get("from")
    target = data.get("to")

    try:
        move = chess.Move.from_uci(source + target)
        if move in game.legal_moves:
            game.push(move)
            return jsonify({
                "status": "ok",
                "fen": game.fen(),
                "is_game_over": game.is_game_over(),
                "turn": "white" if game.turn else "black"
            })
        else:
            return jsonify({"status": "illegal"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

@app.route("/reset", methods=["POST"])
def reset():
    global game
    game = chess.Board()
    return jsonify({"status": "reset", "fen": game.fen()})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)