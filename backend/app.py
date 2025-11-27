from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["JWT_SECRET_KEY"] = "supersecretkey"
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

with app.app_context():
    db.create_all()

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if data['password'] != data['confirmPassword']:
        return jsonify({"error": "Passwords do not match!"}), 400
    
    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    new_user = User(username=data["username"], email=data["email"], password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify(message="User registered successfully"), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()

    if user and bcrypt.check_password_hash(user.password, data["password"]):
        access_token = create_access_token(identity=user.email)
        return jsonify(access_token=access_token), 200
    
    return jsonify(message="Invalid credentials"), 401

@app.route("/profile", methods=["GET", "PUT"])
@jwt_required()
def profile():
    email = get_jwt_identity()

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify(message="User not found"), 404

    if request.method == "GET":
        return jsonify(username=user.username, email=user.email), 200

    data = request.get_json() or {}

    if "username" in data and data["username"]:
        user.username = data["username"]

    if "email" in data and data["email"]:
        user.email = data["email"]

    if "password" in data and data["password"]:
        user.password = bcrypt.generate_password_hash(
            data["password"]
        ).decode("utf-8")

    db.session.commit()
    return jsonify(message="Profile updated successfully"), 200

if __name__ == "__main__":
    app.run(debug=True)