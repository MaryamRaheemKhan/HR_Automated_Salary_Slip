import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginPage from './Login';
import config from '../config';


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

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.API_URL}/api/auth/register`, formData);
            if (response.status === 200) { // Check for success response status
                setMessage('Registration successful! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login'); // Navigate to login after a short delay
                }, 1500); // Optional delay for showing success message
            } else {
                setMessage(response.data.message || 'Registration failed.');
            }
        } catch (error) {
            setMessage('Registration failed. Please try again.');
            console.error(error);
        }
    };








    return (
        <Grid container style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
            <Grid item xs={12} sm={12} md={6} lg={4} style={{ margin: 'auto' }}>
                <FormContainer>
                    <CenteredLogo src="/path-to-unikrew-logo.png" alt="Unikrew Logo" />
                    <Typography variant="h5" align="center" gutterBottom>
                        Register with Unikrew
                    </Typography>
                    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                            style={{ marginTop: '16px' }}
                        >
                            Register
                        </Button>
                    </Box>
                    {message && (
                        <Typography variant="body2" align="center" style={{ marginTop: '16px', color: 'green' }}>
                            {message}
                        </Typography>
                    )}
                    <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
                        Already have an account? <a href="/login">Login here</a>
                    </Typography>
                </FormContainer>
            </Grid>
        </Grid>
    );
}

export default Register;
