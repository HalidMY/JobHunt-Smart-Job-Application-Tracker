from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from datetime import datetime

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

class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    job_title = db.Column(db.String(120), nullable=False)
    company = db.Column(db.String(120), nullable=False)
    job_url = db.Column(db.String(250), nullable=True)

    location = db.Column(db.String(120), nullable=True)

    date_applied = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    notes = db.Column(db.Text, nullable=True)


with app.app_context():
    db.create_all()

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if data["password"] != data["confirmPassword"]:
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
        user.password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")

    db.session.commit()
    return jsonify(message="Profile updated successfully"), 200


@app.route("/applications", methods=["POST", "GET"])
@jwt_required()
def applications():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    if request.method == "POST":
        data = request.get_json()

        required_fields = ["jobTitle", "companyName", "applicationDate"]
        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"{field} is required"}), 400

        new_application = Application(
            user_id=user.id,
            job_title=data["jobTitle"],
            company=data["companyName"],
            job_url=data.get("jobUrl", ""),
            location=data.get("location", ""),
            date_applied=datetime.strptime(data["applicationDate"], "%Y-%m-%d").date(),
            status="Applied",
            notes=data.get("notes", ""),
        )

        db.session.add(new_application)
        db.session.commit()

        return jsonify({"message": "Application added successfully"}), 201

    apps = Application.query.filter_by(user_id=user.id).all()
    result = [
        {
            "id": app.id,
            "title": app.job_title,
            "company": app.company,
            "status": app.status,
            "location": app.location,
            "date_applied": app.date_applied.isoformat()
            if isinstance(app.date_applied, datetime)
            else str(app.date_applied),
            "job_url": app.job_url,
            "notes": app.notes,
        }
        for app in apps
    ]
    return jsonify(result), 200

@app.route("/applications/<int:app_id>", methods=["PUT"])
@jwt_required()
def update_application(app_id):
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    app_obj = Application.query.filter_by(id=app_id, user_id=user.id).first()
    if not app_obj:
        return jsonify({"error": "Application not found"}), 404

    data = request.get_json() or {}

    if "jobTitle" in data and data["jobTitle"]:
        app_obj.job_title = data["jobTitle"]

    if "companyName" in data and data["companyName"]:
        app_obj.company = data["companyName"]

    if "jobUrl" in data:
        app_obj.job_url = data["jobUrl"] or ""

    if "location" in data:
        app_obj.location = data["location"] or ""

    if "applicationDate" in data and data["applicationDate"]:
        try:
            app_obj.date_applied = datetime.strptime(data["applicationDate"], "%Y-%m-%d").date()
        except ValueError:
            return jsonify({"error": "Invalid date format"}), 400

    if "notes" in data:
        app_obj.notes = data["notes"] or ""

    if "status" in data and data["status"]:
        app_obj.status = data["status"]

    db.session.commit()
    return jsonify({"message": "Application updated"}), 200

@app.route("/applications/<int:app_id>", methods=["DELETE"])
@jwt_required()
def delete_application(app_id):
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()

    app_obj = Application.query.filter_by(id=app_id, user_id=user.id).first()
    if not app_obj:
        return jsonify({"error": "Application not found"}), 404

    db.session.delete(app_obj)
    db.session.commit()
    return jsonify({"message": "Application deleted"}), 200

if __name__ == "__main__":
    app.run(debug=True)