from flask import Blueprint, request, jsonify
import bcrypt

auth = Blueprint('auth', __name__)

users = []

@auth.route('/register', methods=['POST'])
def register():
    data = request.json
    hashed = bcrypt.hashpw(data['password'].encode(), bcrypt.gensalt())

    users.append({
        "email": data['email'],
        "password": hashed,
        "age": data.get('age'),
        "salary": data.get('salary'),
        "investmentType": data.get('investmentType'),
        "name": data.get('name', '')
    })

    return jsonify({"msg": "User registered"})


@auth.route('/login', methods=['POST'])
def login():
    data = request.json

    for user in users:
        if user['email'] == data['email'] and bcrypt.checkpw(data['password'].encode(), user['password']):
            return jsonify({"msg": "Login success", "token": user["email"]})

    return jsonify({"msg": "Invalid credentials"}), 401