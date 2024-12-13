import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus, updateParsedData } from "../app/features/slices/fileSlice";



const FileUploadButton = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.file);
  const parsedData = useSelector((state) => state.file.parsedData);
  useEffect(() => {
    console.log("Updated parsedData:", parsedData);
  }, [parsedData]); // Log updated parsedData whenever it changes

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("file", file);

      dispatch(updateStatus("uploading"));
      console.log("The form data sent from frontend is ", formData);

      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem("token");
        console.log("The token sent here is", token)
        const response = await fetch("http://localhost:5000/api/employees/upload", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`, // Add the token as a Bearer token
          },
        });

        const result = await response.json();
        if (response.ok) {
          console.log("Parsed Data from API:", result.data);

          // Save parsed data to localStorage
          localStorage.setItem("data", JSON.stringify(result.data));

          dispatch(updateParsedData(result.data)); // Overwrite with new parsed data
          dispatch(updateStatus("completed"));
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        dispatch(updateStatus("failed"));
        console.error("Error:", error.message);
      }
    }
  }, [dispatch]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <div>
      <button
        {...getRootProps()}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {status === "idle" || status === "failed" ? "Upload Excel File" : "Processing..."}
      </button>
      <input {...getInputProps()} hidden />
    </div>
  );
};

export default FileUploadButton;
