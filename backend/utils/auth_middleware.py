from functools import wraps
from flask import request, jsonify
import jwt
from config import Config

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 403
        
        try:
            # Remove the 'Bearer ' prefix and decode the token
            token = token.split(" ")[1]
            data = jwt.decode(token, Config.JWT_SECRET, algorithms=["HS256"])
            # Add the decoded data to the request object
            request.username = data['username']  # You can extract other fields as needed
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token is invalid!'}), 403
        
        return f(*args, **kwargs)
    return decorated

