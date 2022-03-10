from flask import Flask

app = Flask(__name__)

@app.route("/members")

def members():
    return {"people": ["henry", "ryan", "wasay", "angela"]}


if __name__ == "__main__": # entry point
    app.run(debug=True)