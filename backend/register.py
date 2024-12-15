import pytest
from app import app  # Import your Flask app
from utils.db import mongo  # Ensure this import exists
import json


@pytest.fixture
def client():
    # with app.test_client() as client:
    #     yield client
      app.config['TESTING'] = True
      with app.test_client() as client:
        yield client

# Test case: Successful registration
def test_register_success(client, mocker):
    # Patch add_hr in hr_model
    mock_add_hr =mocker.patch('models.hr_model.add_hr')

    mock_add_hr.return_value = None  # Simulate successful insertion

    response = client.post('/api/auth/register', json={
        'username': 'testuser',
        'email': 'testuser@example.com',
        'password': 'password123'
    })
    assert response.status_code == 201
    assert response.json['message'] == "HR registered successfully!"

# Test case: Missing fields
@pytest.mark.parametrize("payload, missing_field", [
    ({'email': 'testuser@example.com', 'password': 'password123'}, 'username'),
    ({'username': 'testuser', 'password': 'password123'}, 'email'),
    ({'username': 'testuser', 'email': 'testuser@example.com'}, 'password')
])
def test_register_missing_fields(client, payload, missing_field):
    response = client.post('/api/auth/register', json=payload)
    assert response.status_code == 400
    assert response.json['error'] == 'All fields are required'  # Ensure correct error message

# Test case: Exception handling
def test_register_exception(client, mocker):
    # Patch add_hr in hr_model to raise an exception
    mock_add_hr = mocker.patch('models.hr_model.add_hr', side_effect=Exception('Database connection failed'))

    response = client.post('/api/auth/register', json={
        'username': 'testuser',
        'email': 'testuser@example.com',
        'password': 'password123'
    })
    assert response.status_code == 400
    assert "An error occurred: Database connection failed" in response.json['message']
