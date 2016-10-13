from run import app
from flask import Flask, render_template, jsonify


@app.route("/")
@app.route("/index")
def index():
    return render_template("home.html")


@app.route("/chaika", methods=['GET', 'POST'])
def chaika():
    return render_template("graph_chaika.html")

@app.route("/brush", methods=['GET', 'POST'])
def brush():
    return render_template("graph_brush.html")
