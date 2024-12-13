# # # # # # from cryptography.fernet import Fernet
# # # # # # import os

# # # # # # # Step 1: Generate the Fernet key
# # # # # # key = Fernet.generate_key()
# # # # # # print("Generated Fernet key:", key.decode())

# # # # # # # Step 2: Save the key to the .env file
# # # # # # with open(".env", "a") as env_file:  # Open in append mode
# # # # # #     env_file.write(f"\nJWT_SECRET={key.decode()}\n")

# # # # # # print("Key saved to .env successfully!")

# # # # # # # Step 3: Load the Fernet key for encryption and decryption
# # # # # # cipher_suite = Fernet(key)  # Use the generated key

# # # # # # # Step 4: Encryption function
# # # # # # def encrypt(data):
# # # # # #     """
# # # # # #     Encrypt the given data using the Fernet key.
# # # # # #     :param data: str - The plain text to encrypt.
# # # # # #     :return: str - The encrypted data as a string.
# # # # # #     """
# # # # # #     return cipher_suite.encrypt(data.encode()).decode()

# # # # # # # Step 5: Decryption function
# # # # # # def decrypt(data):
# # # # # #     """
# # # # # #     Decrypt the given encrypted data using the Fernet key.
# # # # # #     :param data: str - The encrypted data to decrypt.
# # # # # #     :return: str - The decrypted plain text.
# # # # # #     """
# # # # # #     return cipher_suite.decrypt(data.encode()).decode()

# # # # # # # Example usage
# # # # # # if __name__ == "__main__":
# # # # # #     # Example plain text
# # # # # #     plain_text = "my_secure_password"

# # # # # #     # Encrypt the plain text
# # # # # #     encrypted_text = encrypt(plain_text)
# # # # # #     print("Encrypted text:", encrypted_text)

# # # # # #     # Decrypt the encrypted text
# # # # # #     decrypted_text = decrypt(encrypted_text)
# # # # # #     print("Decrypted text:", decrypted_text)
# # # # # from cryptography.fernet import Fernet
# # # # # import os

# # # # # # Step 1: Check if the key already exists in .env file
# # # # # def key_exists():
# # # # #     if os.path.exists(".env"):
# # # # #         with open(".env", "r") as env_file:
# # # # #             contents = env_file.read()
# # # # #             return "JWT_SECRET=" in contents
# # # # #     return False

# # # # # # Step 2: Generate the Fernet key if it doesn't exist
# # # # # if not key_exists():
# # # # #     key = Fernet.generate_key()
# # # # #     print("Generated Fernet key:", key.decode())

# # # # #     # Save the key to the .env file
# # # # #     with open(".env", "a") as env_file:  # Open in append mode
# # # # #         env_file.write(f"\nJWT_SECRET={key.decode()}\n")

# # # # #     print("Key saved to .env successfully!")
# # # # # else:
# # # # #     print("Fernet key already exists in .env file.")

# # # # # # Step 3: Load the Fernet key for encryption and decryption
# # # # # # Since the key is already saved, you can load it from .env
# # # # # with open(".env", "r") as env_file:
# # # # #     contents = env_file.read()
# # # # #     key = contents.split("JWT_SECRET=")[-1].strip()

# # # # # cipher_suite = Fernet(key)  # Use the generated or existing key

# # # # # # Step 4: Encryption function
# # # # # def encrypt(data):
# # # # #     """
# # # # #     Encrypt the given data using the Fernet key.
# # # # #     :param data: str - The plain text to encrypt.
# # # # #     :return: str - The encrypted data as a string.
# # # # #     """
# # # # #     return cipher_suite.encrypt(data.encode()).decode()

# # # # # # Step 5: Decryption function
# # # # # def decrypt(data):
# # # # #     """
# # # # #     Decrypt the given encrypted data using the Fernet key.
# # # # #     :param data: str - The encrypted data to decrypt.
# # # # #     :return: str - The decrypted plain text.
# # # # #     """
# # # # #     return cipher_suite.decrypt(data.encode()).decode()


# # # # from cryptography.fernet import Fernet
# # # # import os

# # # # # Step 1: Check if the key already exists in .env file
# # # # def key_exists():
# # # #     if os.path.exists(".env"):
# # # #         with open(".env", "r") as env_file:
# # # #             contents = env_file.read()
# # # #             return "JWT_SECRET=" in contents
# # # #     return False

# # # # # Step 2: Generate the Fernet key if it doesn't exist
# # # # if not key_exists():
# # # #     key = Fernet.generate_key()
# # # #     print("Generated Fernet key:", key.decode())

# # # #     # Save the key to the .env file
# # # #     with open(".env", "a") as env_file:  # Open in append mode
# # # #         env_file.write(f"\nJWT_SECRET={key.decode()}\n")

# # # #     print("Key saved to .env successfully!")
# # # # else:
# # # #     print("Fernet key already exists in .env file.")

# # # # # Step 3: Load the Fernet key for encryption and decryption
# # # # with open(".env", "r") as env_file:
# # # #     contents = env_file.read()
# # # #     # Extract the key and remove any extra spaces or newlines
# # # #     key = contents.split("JWT_SECRET=")[-1].strip()

# # # # # Ensure the key is valid base64 and of the correct length
# # # # if len(key) != 44:  # Fernet key length should be 44 chars
# # # #     raise ValueError("The Fernet key is invalid. It should be 32 url-safe base64-encoded bytes.")

# # # # cipher_suite = Fernet(key)  # Use the generated or existing key

# # # # # Step 4: Encryption function
# # # # def encrypt(data):
# # # #     """
# # # #     Encrypt the given data using the Fernet key.
# # # #     :param data: str - The plain text to encrypt.
# # # #     :return: str - The encrypted data as a string.
# # # #     """
# # # #     return cipher_suite.encrypt(data.encode()).decode()

# # # # # Step 5: Decryption function
# # # # def decrypt(data):
# # # #     """
# # # #     Decrypt the given encrypted data using the Fernet key.
# # # #     :param data: str - The encrypted data to decrypt.
# # # #     :return: str - The decrypted plain text.
# # # #     """
# # # #     return cipher_suite.decrypt(data.encode()).decode()
# # # from cryptography.fernet import Fernet
# # # import os

# # # # Step 1: Check if the key already exists in .env file
# # # def key_exists():
# # #     if os.path.exists(".env"):
# # #         with open(".env", "r") as env_file:
# # #             contents = env_file.read()
# # #             return "JWT_SECRET=" in contents
# # #     return False

# # # # Step 2: Generate the Fernet key if it doesn't exist
# # # if not key_exists():
# # #     key = Fernet.generate_key()
# # #     print("Generated Fernet key:", key.decode())  # Debugging log

# # #     # Save the key to the .env file
# # #     with open(".env", "a") as env_file:  # Open in append mode
# # #         env_file.write(f"\nJWT_SECRET={key.decode()}\n")

# # #     print("Key saved to .env successfully!")  # Debugging log
# # # else:
# # #     print("Fernet key already exists in .env file.")  # Debugging log

# # # # Step 3: Load the Fernet key for encryption and decryption
# # # with open(".env", "r") as env_file:
# # #     contents = env_file.read()
# # #     key = contents.split("JWT_SECRET=")[-1].strip()

# # # # Ensure the key is valid base64 and of the correct length
# # # if len(key) != 44:  # Fernet key length should be 44 chars
# # #     raise ValueError("The Fernet key is invalid. It should be 32 url-safe base64-encoded bytes.")

# # # cipher_suite = Fernet(key)  # Use the generated or existing key

# # # # Step 4: Encryption function
# # # def encrypt(data):
# # #     """
# # #     Encrypt the given data using the Fernet key.
# # #     :param data: str - The plain text to encrypt.
# # #     :return: str - The encrypted data as a string.
# # #     """
# # #     encrypted_data = cipher_suite.encrypt(data.encode()).decode()
# # #     print(f"Encrypted data: {encrypted_data}")  # Debugging log
# # #     return encrypted_data

# # # # Step 5: Decryption function
# # # def decrypt(data):
# # #     """
# # #     Decrypt the given encrypted data using the Fernet key.
# # #     :param data: str - The encrypted data to decrypt.
# # #     :return: str - The decrypted plain text.
# # #     """
# # #     decrypted_data = cipher_suite.decrypt(data.encode()).decode()
# # #     print(f"Decrypted data: {decrypted_data}")  # Debugging log
# # #     return decrypted_data
# # import os
# # from cryptography.fernet import Fernet
# # from dotenv import load_dotenv

# # # Load environment variables from .env file
# # load_dotenv()

# # # Get the JWT_SECRET from the environment (it should already be in base64 format)
# # JWT_SECRET = os.getenv('JWT_SECRET')

# # if not JWT_SECRET:
# #     raise ValueError("JWT_SECRET is not set in the .env file")

# # # Initialize Fernet cipher suite with the key from JWT_SECRET
# # cipher_suite = Fernet(JWT_SECRET)

# # # Step 1: Encrypt function (for registration)
# # def encrypt_password(password: str) -> str:
# #     """
# #     Encrypt the given password using the JWT_SECRET key.
# #     :param password: The plain password to encrypt.
# #     :return: The encrypted password as a string.
# #     """
# #     encrypted_password = cipher_suite.encrypt(password.encode()).decode()
# #     return encrypted_password

# # # Step 2: Decrypt function (for login)
# # def decrypt_password(encrypted_password: str) -> str:
# #     """
# #     Decrypt the encrypted password using the JWT_SECRET key.
# #     :param encrypted_password: The encrypted password to decrypt.
# #     :return: The decrypted plain password as a string.
# #     """
# #     decrypted_password = cipher_suite.decrypt(encrypted_password.encode()).decode()
# #     return decrypted_password

# # # Example usage in Register Route
# # def register_user(email: str, password: str):
# #     encrypted_password = encrypt_password(password)
# #     # Store encrypted_password in your database
# #     print(f"Registered user: {email}, Encrypted Password: {encrypted_password}")

# # # Example usage in Login Route
# # def login_user(email: str, encrypted_password: str, input_password: str):
# #     decrypted_password = decrypt_password(encrypted_password)
# #     if decrypted_password == input_password:
# #         print(f"Login successful for {email}")
# #     else:
# #         print(f"Incorrect password for {email}")

# import os
# from cryptography.fernet import Fernet
# from dotenv import load_dotenv
# import jwt  # Importing the pyjwt library for JWT creation
# from datetime import datetime, timedelta

# # Load environment variables from .env file
# load_dotenv()

# # Get the JWT_SECRET from the environment (it should already be in base64 format)
# JWT_SECRET = os.getenv('JWT_SECRET')

# if not JWT_SECRET:
#     raise ValueError("JWT_SECRET is not set in the .env file")

# # Initialize Fernet cipher suite with the key from JWT_SECRET
# cipher_suite = Fernet(JWT_SECRET)

# # JWT secret for signing JWTs (can be a different secret from the Fernet key)
# JWT_SIGNING_SECRET = os.getenv('JWT_SIGNING_SECRET', 'my_jwt_signing_secret')

# if not JWT_SIGNING_SECRET:
#     raise ValueError("JWT_SIGNING_SECRET is not set in the .env file")

# # Step 1: Encrypt function (for registration)
# def encrypt_password(password: str) -> str:
#     """
#     Encrypt the given password using the JWT_SECRET key.
#     :param password: The plain password to encrypt.
#     :return: The encrypted password as a string.
#     """
#     encrypted_password = cipher_suite.encrypt(password.encode()).decode()
#     return encrypted_password

# # Step 2: Decrypt function (for login)
# def decrypt_password(encrypted_password: str) -> str:
#     """
#     Decrypt the encrypted password using the JWT_SECRET key.
#     :param encrypted_password: The encrypted password to decrypt.
#     :return: The decrypted plain password as a string.
#     """
#     decrypted_password = cipher_suite.decrypt(encrypted_password.encode()).decode()
#     return decrypted_password

# # Step 3: Generate JWT token after successful login
# def generate_jwt_token(email: str) -> str:
#     """
#     Generate a JWT token for the user.
#     :param email: The email of the user.
#     :return: The generated JWT token.
#     """
#     expiration = datetime.utcnow() + timedelta(hours=1)  # Token expiration time (1 hour)
#     token = jwt.encode(
#         {"email": email, "exp": expiration},
#         JWT_SIGNING_SECRET,  # Use the JWT_SIGNING_SECRET to sign the token
#         algorithm="HS256"  # HMAC SHA256 algorithm
#     )
#     return token

# # Example usage in Register Route
# def register_user(email: str, password: str):
#     encrypted_password = encrypt_password(password)
#     # Store encrypted_password in your database
#     print(f"Registered user: {email}, Encrypted Password: {encrypted_password}")
#     # Generate JWT token after successful registration
#     jwt_token = generate_jwt_token(email)
#     print(f"Generated JWT Token: {jwt_token}")

# # Example usage in Login Route
# def login_user(email: str, encrypted_password: str, input_password: str):
#     decrypted_password = decrypt_password(encrypted_password)
#     if decrypted_password == input_password:
#         print(f"Login successful for {email}")
#         # Generate JWT token after successful login
#         jwt_token = generate_jwt_token(email)
#         print(f"Generated JWT Token: {jwt_token}")
#     else:
#         print(f"Incorrect password for {email}")
