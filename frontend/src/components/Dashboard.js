// import React from "react";
// import { Provider } from "react-redux";
// import { store } from "../app/features/store/store";
// import FileUpload from "./FileUpload";
// import Table from "./Table";




// function Dashboard() {
//   return (
//        <Provider store={store}>
//       <h1 style={{textAlign:'center'}}>HR DASHBOARD FOR EMPLOYEE SALARY</h1>
//       <div>
//       <FileUpload/>
//       <Table/>
//       </div>
//     </Provider>
//   )
// }

// export default Dashboard

import React from "react";
import { Provider } from "react-redux";
import { store } from "../app/features/store/store";
import FileUpload from "./FileUpload";
import Table from "./Table";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";  // Import useNavigate hook


function Dashboard() {
  const navigate = useNavigate();  // Hook for navigation
  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing session, redirecting, etc.)
    localStorage.removeItem("token");
    navigate("/login");  // Adjust the path as necessary
    console.log("Logged out");
  };

  return (
    <Provider store={store}>
      <div style={{ position: "relative" }}>
        <h1 style={{ textAlign: "center" }}>HR DASHBOARD FOR EMPLOYEE SALARY</h1>
        
        {/* Logout Button */}
        <Button 
          onClick={handleLogout}
          variant="contained"
          color="secondary"
          style={{
            position: "absolute",
            top: "10px",
            right: "20px"
          }}
        >
          Logout
        </Button>
        
        <div>
          <FileUpload />
          <Table />
        </div>
      </div>
    </Provider>
  );
}

export default Dashboard;
