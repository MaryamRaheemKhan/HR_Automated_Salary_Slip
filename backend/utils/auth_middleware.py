from functools import wraps
from flask import request, jsonify
import jwt
from config import Config

# Decorator function to require a valid token for access
def token_required(f):
    # The wrapped function that checks the token and proceeds with the request
    @wraps(f)
    def decorated(*args, **kwargs):
        # Get the token from the 'Authorization' header
        token = request.headers.get('Authorization')
        
        # If no token is provided, return a 403 error with a message
        if not token:
            return jsonify({'message': 'Token is missing!'}), 403
        
        try:
            # Remove the 'Bearer ' prefix from the token and decode it
            token = token.split(" ")[1]
            # Decode the token using the secret key from the config, and specify the algorithm (HS256)
            data = jwt.decode(token, Config.JWT_SECRET, algorithms=["HS256"])
            # Add the decoded 'username' from the token to the request object for access in the route
            request.username = data['username']  # You can extract other fields as needed
        except jwt.ExpiredSignatureError:
            # If the token has expired, return a 403 error with a message
            return jsonify({'message': 'Token has expired!'}), 403
        except jwt.InvalidTokenError:
            # If the token is invalid, return a 403 error with a message
            return jsonify({'message': 'Token is invalid!'}), 403
        
        # Proceed with the decorated function if the token is valid
        return f(*args, **kwargs)
    
    # Return the decorated function
    return decorated

