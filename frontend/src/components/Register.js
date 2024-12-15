import React, { useState } from 'react'; // Importing React and useState hook for managing state
import { Box, TextField, Button, Typography, Grid2, Paper } from '@mui/material'; // Importing Material UI components for layout and styling
import { styled } from '@mui/system'; // Importing MUI's styled API for custom styling
import axios from 'axios'; // Importing axios for making API requests
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation after successful registration
import LoginPage from './Login'; // Importing the Login page component for redirection
import config from '../config'; // Importing the config file for API URL
import img from '../../src/Logo.PNG'; // Importing logo image for display

// Custom styles using MUI's styled API for form container
const FormContainer = styled(Paper)(({ theme }) => ({
    maxWidth: 400, // Max width of the form container
    padding: theme.spacing(4), // Padding inside the form
    margin: 'auto', // Center the form horizontally
    borderRadius: theme.spacing(2), // Rounded corners for the form
    backgroundColor: "#FFFFFF", // Background color of the form
}));

// Custom styles for the centered logo image
const CenteredLogo = styled('img')({
    display: 'block', // Makes the image block-level
    margin: '0 auto', // Centers the image horizontally
    maxWidth: '150px', // Max width of the logo
    marginBottom: '20px', // Bottom margin to separate the logo from the form
});

function Register() {
    // State hooks for form data (username, email, password) and message
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook for navigation after successful registration

    // Handler for input changes (username, email, password)
    const handleInputChange = (e) => {
        const { name, value } = e.target; // Extract name and value from input
        setFormData({ ...formData, [name]: value }); // Update formData state with new input values
    };

    // Handler for form submission (register)
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents page refresh on form submit
        try {
            // Sending a POST request to the registration API endpoint
            const response = await axios.post(`${config.API_URL}/api/auth/register`, formData);
            if (response.status === 200) { // If registration is successful
                setMessage('Registration successful! Redirecting to login...'); // Success message
                setTimeout(() => {
                    navigate('/login'); // Navigate to login page after delay
                }, 1500); // Delay of 1.5 seconds before navigation
            } else {
                setMessage(response.data.message || 'Registration failed.'); // Display error message if registration fails
            }
        } catch (error) {
            setMessage('Registration failed. Please try again.'); // Display error message if API call fails
            console.error(error); // Log the error to the console
        }
    };

    return (
        <Grid2 container style={{ minHeight: '100vh', backgroundColor: '#F5F5F5' }}> {/* Container with full height and light background */}
            <Grid2 item xs={12} sm={12} md={6} lg={4} style={{ margin: 'auto' }}> {/* Grid item to center the form */}
                <FormContainer> {/* Custom styled form container */}
                    <CenteredLogo src={img} alt="Unikrew Logo" /> {/* Logo centered at the top */}
                    <Typography variant="h5" align="center" gutterBottom> {/* Form heading */}
                        Register with Unikrew
                    </Typography>
                    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}> {/* Form with no validation and auto-complete off */}
                        <TextField
                            fullWidth
                            label="Full Name"
                            margin="normal"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Email Address"
                            margin="normal"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            margin="normal"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                            style={{ marginTop: '16px' }} // Margin for the submit button
                        >
                            Register
                        </Button>
                    </Box>
                    {message && ( // If there is a message, display it below the form
                        <Typography variant="body2" align="center" style={{ marginTop: '16px', color: 'green' }}>
                            {message} {/* Display the success/error message */}
                        </Typography>
                    )}
                    <Typography variant="body2" align="center" style={{ marginTop: '16px' }}> {/* Login redirect text */}
                        Already have an account? <a href="/login">Login here</a>
                    </Typography>
                </FormContainer>
            </Grid2>
        </Grid2>
    );
}

export default Register; // Exporting Register component to be used in other parts of the app
