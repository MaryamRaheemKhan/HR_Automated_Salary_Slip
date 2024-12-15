import React from "react";  // Importing React
import { Provider } from "react-redux";  // Importing Provider to wrap the component with Redux store
import { store } from "../app/features/store/store";  // Importing Redux store
import FileUpload from "./FileUpload";  // Importing FileUpload component for file uploading
import Table from "./Table";  // Importing Table component to display the table
import { Button } from "@mui/material";  // Importing Material-UI Button component
import { useNavigate } from "react-router-dom";  // Importing useNavigate hook for navigation between pages


function Dashboard() {
  const navigate = useNavigate();  // Initializing the useNavigate hook to programmatically navigate

  // handleLogout function to clear session and navigate to the login page
  const handleLogout = () => {
    // Remove the token from localStorage to log the user out
    localStorage.removeItem("token");
    navigate("/login");  // Navigate to the login page after logout
    console.log("Logged out");  // Log to the console (for debugging)
  };

  return (
    <Provider store={store}>  {/* Wrapping the component with Provider to provide Redux store to child components */}
      <div style={{ position: "relative" }}> {/* Div container with relative position for positioning elements */}
        
        {/* Heading for the Dashboard */}
        <h1 style={{ textAlign: "center" }}>HR Salary Slip Portal of Unikrew Company</h1>
        
        {/* Logout Button */}
        <Button 
          onClick={handleLogout}  // Trigger the handleLogout function on button click
          variant="contained"  // MUI button variant
          style={{
            position: "absolute",  // Absolute positioning for placing it in the top-right corner
            top: "3px",
            right: "20px",
            backgroundColor:'black',  // Styling button background color to black
            color:'white'  // Styling button text color to white
          }}
        >
          Logout  {/* Text displayed inside the button */}
        </Button>
        
        <div>
          {/* FileUpload component for file handling */}
          <FileUpload />
          
          {/* Table component to display data */}
          <Table />
        </div>
      </div>
    </Provider>
  );
}

export default Dashboard;  // Exporting Dashboard component for use in other parts of the app
