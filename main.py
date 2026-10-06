from flask import Flask
import uuid

app = Flask(__name__)

@app.route("/")
def inicio():
    return "<h1>O João não está entendendo nada certo?!</h1><p>Minha primeira aplicação web em Python.</p>"

@app.route("/id")
def gerar_id():
    return f"<h1>ID do usuário:</h1><p>{uuid.uuid4()}</p>"

app.run(host="0.0.0.0", port=5000)