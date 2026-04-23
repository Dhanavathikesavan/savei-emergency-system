from flask import Flask, render_template, request, jsonify
import datetime, json, os

app = Flask(__name__)
FILE_NAME = "alerts.json"

def load_alerts():
    if os.path.exists(FILE_NAME):
        with open(FILE_NAME, "r") as f:
            return json.load(f)
    return []

def save_alerts(alerts):
    with open(FILE_NAME, "w") as f:
        json.dump(alerts, f, indent=4)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/send", methods=["POST"])
def send():
    alerts = load_alerts()
    data = request.json

    alert = {
        "name": data["name"],
        "location": data["location"],
        "message": data["message"],
        "time": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

    alerts.append(alert)
    save_alerts(alerts)

    return jsonify({"status": "success"})

@app.route("/alerts")
def alerts():
    return jsonify(load_alerts())

if __name__ == "__main__":
    app.run(debug=True)