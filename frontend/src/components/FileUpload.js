import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";  // Importing the useDropzone hook for drag-and-drop file upload
import { useDispatch, useSelector } from "react-redux";  // Importing Redux hooks
import { updateStatus, updateParsedData } from "../app/features/slices/fileSlice";  // Actions for updating file status and parsed data in the Redux store
import config from "../config";  // Importing configuration, presumably for API URL
import Snackbar from "@mui/material/Snackbar";  // Importing Snackbar component for notifications
import Alert from "@mui/material/Alert";  // Importing Alert component to display error/success messages in the Snackbar


const FileUploadButton = () => {
  // Accessing Redux dispatch and state
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.file);  // Fetching file upload status from Redux store
  const parsedData = useSelector((state) => state.file.parsedData);  // Fetching parsed data from Redux store

  // State for Snackbar notification
  const [snackbar, setSnackbar] = useState({
    open: false,  // Whether the Snackbar is open
    message: "",  // The message to display
    severity: "info",  // Severity level of the message (info, success, error)
  });

  // useEffect hook to log parsed data whenever it changes
  useEffect(() => {
    console.log("Updated parsedData:", parsedData);
  }, [parsedData]);

  // onDrop function to handle file drop
  const onDrop = useCallback(async (acceptedFiles) => {
    // Check if any file is dropped
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];  // Get the first file
      const formData = new FormData();  // Creating a new FormData object to send file data
      formData.append("file", file);  // Append the file to the form data

      dispatch(updateStatus("uploading"));  // Update the Redux store with status 'uploading'
      console.log("The form data sent from frontend is ", formData);

      try {
        // Retrieve token from localStorage for authentication
        const token = localStorage.getItem("token");
        console.log("The token sent here is", token);

        // Make the API request to upload the file
        const response = await fetch(`${config.API_URL}/api/employees/upload`, {
          method: "POST",  // HTTP POST request
          body: formData,  // Attach the FormData containing the file
          headers: {
            Authorization: `Bearer ${token}`,  // Add the token as a Bearer token for authorization
          },
        });

        const result = await response.json();  // Parse the response JSON
        
        // Check if the response is successful
        if (response.ok) {
          console.log("Parsed Data from API:", result.data);

          // Save parsed data to localStorage for future use
          localStorage.setItem("data", JSON.stringify(result.data));

          // Dispatch action to update Redux store with the parsed data
          dispatch(updateParsedData(result.data)); 
          dispatch(updateStatus("completed"));  // Update the status to 'completed'

          // Show success Snackbar notification
          setSnackbar({
            open: true,
            message: "File uploaded successfully!",
            severity: "success",  // Show success severity level
          });
        } else {
          // If the response is not OK, throw an error
          throw new Error(result.error);
        }
      } catch (error) {
        // If any error occurs during the upload, update the status and show an error Snackbar
        dispatch(updateStatus("failed"));
        console.error("Error:", error.message);

        setSnackbar({
          open: true,
          message: `Upload failed: ${error.message}`,
          severity: "error",  // Show error severity level
        });
      }
    }
  }, [dispatch]);

  // Using useDropzone hook to manage file drag-and-drop functionality
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,  // Callback when file is dropped
    maxFiles: 1,  // Restrict to only one file at a time
  });

  return (
    <div>
      {/* Upload button styled with inline styles */}
      <button
        {...getRootProps()}  // Spread dropzone properties onto the button to make it a drop target
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {/* Button text changes based on the status */}
        {status === "idle" || status === "failed" ? "Upload Excel File" : "Processing..."}
      </button>
      <input {...getInputProps()} hidden />  {/* Hidden input for file selection */}

      {/* Snackbar component for showing notifications */}
      <Snackbar
        open={snackbar.open}  // Whether the Snackbar is open
        autoHideDuration={6000}  // Auto-hide duration in milliseconds
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}  // Close the Snackbar
      >
        {/* Alert component inside Snackbar to show the message */}
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}  // Close the alert
          severity={snackbar.severity}  // Severity level (info, success, error)
          variant="filled"  // Filled variant for a solid background color
        >
          {snackbar.message}  {/* Display the Snackbar message */}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FileUploadButton;
