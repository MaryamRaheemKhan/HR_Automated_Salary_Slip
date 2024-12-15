import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid2, Paper } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios'; // To make API requests
import { useNavigate } from 'react-router-dom';
import config from '../config';
import img from '../../src/Logo.PNG'; // Import logo image
import Register from './Register'; // Import Register component

// Custom styles using MUI's styled API
const FormContainer = styled(Paper)(({ theme }) => ({
  maxWidth: 400,
  padding: theme.spacing(4),
  margin: 'auto',
  borderRadius: theme.spacing(2),
  backgroundColor: "#FFFFFF", // Light blue background color for the form container
}));

const CenteredLogo = styled('img')({
  display: 'block',
  margin: '0 auto',
  maxWidth: '150px',
  marginBottom: '20px', // Ensures logo is centered and provides some spacing
});

// Login Page Component
export const LoginPage = () => {
  // States to store form input values and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Holds any error message for login failure
  const navigate = useNavigate(); // Hook to handle navigation after login

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Send POST request to login API endpoint with the email and password
      const response = await axios.post(`${config.API_URL}/api/auth/login`, {
        username: email,
        password: password,
      });
      console.log('Login successful:', response.data);

      // Store the token in localStorage if login is successful
      localStorage.setItem('token', response.data.token);

      // Redirect user to the dashboard after login
      navigate('/dashboard'); // Use navigate to go to the dashboard
    } catch (err) {
      // Handle login errors
      console.error('Login failed:', err);
      setError('Invalid email or password. Please try again.'); // Show error message if login fails
    }
  };

  return (
    <Grid2 container style={{ minHeight: '100vh', backgroundColor: '#F5F5F5' }}>
      <Grid2 item xs={12} sm={12} md={6} lg={4} style={{ margin: 'auto' }}>
        <FormContainer>
          {/* Logo section */}
          <CenteredLogo src={img} alt="Unikrew Logo" />
          <Typography variant="h5" align="center" gutterBottom>
            Login to Unikrew
          </Typography>
          
          {/* Login form */}
          <Box component="form" noValidate autoComplete="off" onSubmit={handleLogin}>
            {/* Email input field */}
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state on input change
            />
            
            {/* Password input field */}
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state on input change
            />

            {/* Display error message if login fails */}
            {error && (
              <Typography color="error" variant="body2" style={{ marginTop: '8px' }}>
                {error}
              </Typography>
            )}

            {/* Submit button to trigger login */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              style={{ marginTop: '16px' }}
            >
              Login
            </Button>
          </Box>

          {/* Registration link for users who don't have an account */}
          <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
            Don’t have an account? <a href="/Register">Register here</a>
          </Typography>
        </FormContainer>
      </Grid2>
    </Grid2>
  );
};

export default LoginPage;


