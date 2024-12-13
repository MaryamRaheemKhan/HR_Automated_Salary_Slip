import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid2, Paper } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios'; // To make API requests
import {useNavigate} from 'react-router-dom';


// Custom styles using MUI's styled API
const FormContainer = styled(Paper)(({ theme }) => ({
  maxWidth: 400,
  padding: theme.spacing(4),
  margin: 'auto',
  borderRadius: theme.spacing(2),
  backgroundColor: "#ADD8E6", // Light blue
}));

const CenteredLogo = styled('img')({
  display: 'block',
  margin: '0 auto',
  maxWidth: '150px',
  marginBottom: '20px',
});

// Login Page Component
export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate();

//   const handleLogin = async (e) => {

//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', {
//         username: email,
//         password: password,
//       });
//       console.log('Login successful:', response.data);
//       // Handle success (e.g., save token, redirect user)
//     } catch (err) {
//       console.error('Login failed:', err);
//       setError('Invalid email or password. Please try again.');
//     }
//   };
// const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', {
//         username: email,
//         password: password,
//       });
//       console.log('Login successful:', response.data);

//       // Store the token in localStorage
//       localStorage.setItem('token', response.data.token);

//       // Redirect user to the dashboard or home page after login
//       // window.location.href = '/dashboard'; // or use a react router method to navigate
//     } catch (err) {
//       console.error('Login failed:', err);
//       setError('Invalid email or password. Please try again.');
//     }
// };
const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username: email,
        password: password,
      });
      console.log('Login successful:', response.data);

      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect user to the dashboard after login
      navigate('/dashboard'); // Use navigate to go to the dashboard
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password. Please try again.');
    }
};


  return (
    <Grid2 container style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Grid2 item xs={12} sm={12} md={6} lg={4} style={{ margin: 'auto' }}>
        <FormContainer>
          <CenteredLogo src="/path-to-unikrew-logo.png" alt="Unikrew Logo" />
          <Typography variant="h5" align="center" gutterBottom>
            Login to Unikrew
          </Typography>
          <Box component="form" noValidate autoComplete="off" onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography color="error" variant="body2" style={{ marginTop: '8px' }}>
                {error}
              </Typography>
            )}
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
          <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
            Don’t have an account? <a href="/register">Register here</a>
          </Typography>
        </FormContainer>
      </Grid2>
    </Grid2>
  );
};

export default LoginPage;



