
import React, { useState, useEffect } from "react";  // Import React and relevant hooks
import { MaterialReactTable } from "material-react-table";  // Import MaterialReactTable component for table rendering
import { CSVLink } from "react-csv";  // Import CSVLink for exporting table data to CSV
import {
  Button,
  Box,
  Tooltip,
  Modal,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";  // Import Material UI components for styling and UI
import { useSelector, useDispatch } from "react-redux";  // Import Redux hooks to interact with the state
import { updatePdfFilesByUser, saveGeneratedPdfs } from "../app/features/slices/fileSlice";  // Import actions to interact with Redux state
import axios from "axios";  // Import axios for making HTTP requests
import { format } from "date-fns";  // Import date-fns for date formatting
import config from "../config";  // Import config for accessing API URL


const Table = () => {
  const dispatch = useDispatch();
  const parsedData = useSelector((state) => state.file.parsedData);
  const pdfFilesByUser = useSelector((state) => state.file.pdfFilesByUser);
    const [snackbar, setSnackbar] = useState({
    open: false,  // State to control snackbar visibility
    message: "",  // State to store snackbar message
    severity: "info",  // State to store severity level of the snackbar (info, success, error, etc.)
  });

  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [pdfUrls, setPdfUrls] = useState([]);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);

  useEffect(() => {
    console.log("Selected PDF URL has changed:", selectedPdfUrl);
  }, [selectedPdfUrl]);
  useEffect(() => {
    // Fetch the pdfArray from localStorage when the component mounts
    const pdfArray = JSON.parse(localStorage.getItem("pdfArray")) || [];

    // Find the pdf paths for the selected employee
    const selectedEmployee = pdfArray.find(employee => employee.employeeID === selectedUserId);

    if (selectedEmployee) {
      setPdfUrls(selectedEmployee.pdfPaths); // Set the pdfPaths of the selected employee
    } else {
      setPdfUrls([]); // If no PDFs are found for the employee, set to an empty array
    }
  }, [selectedUserId]); // Re-run the effect when selectedUserId changes

  const cleanData = (JSON.parse(localStorage.getItem("data")) || []).map((row) => {
    const dateOfJoining = row.DateofJoining ? new Date(row.DateofJoining) : null;
    const formattedDate = dateOfJoining && !isNaN(dateOfJoining)
      ? format(dateOfJoining, 'yyyy-MM-dd')
      : 'N/A';

    return {
      EmployeeID: row.EmployeeID || "Unknown",
      Name: row.Name || "Unknown",
      Gender: row.Gender || "Unknown",
      Position: row.Position || "Unknown",
      EmployeeStatus: row.EmployeeStatus || "Unknown",
      DateOfJoining: formattedDate,
      BasicSalary: Number(row.BasicSalary || 0),
      WorkingTenure: Number(row.WorkingTenure || 0),
      Designation: row.Designation || "Unknown",
      Email: row.Email || "Unknown",
      Month: row.Month || "Unknown",
      Allowances: Number(row.Allowances || 0),
      Deductions: Number(row.Deductions || 0),
      NetSalary: Number(row.NetSalary || 0),
    };
  });

  const tableData = parsedData && parsedData.length > 0 ? parsedData : cleanData;

  const columns = [
    { accessorKey: "EmployeeID", header: "EmployeeID", type: "string" },
    { accessorKey: "Name", header: "Name", type: "string" },
    { accessorKey: "Gender", header: "Gender", type: "string" },
    { accessorKey: "Position", header: "Position", type: "string" },
    { accessorKey: "EmployeeStatus", header: "EmployeeStatus", type: "string" },
    {
      accessorKey: "DateOfJoining",
      header: "Date of Joining",
      type: "date",
      cell: ({ row }) => {
        const date = row.getValue("DateOfJoining");
        const parsedDate = Date.parse(date);
        return parsedDate ? format(new Date(parsedDate), "dd/MM/yyyy") : "N/A";
      },
    },
    {
      accessorKey: "BasicSalary",
      header: "BasicSalary",
      type: "number",
      Cell: ({ cell }) =>
        cell.getValue().toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
    },
    { accessorKey: "WorkingTenure", header: "WorkingTenure (Years)", type: "number" },
    { accessorKey: "Designation", header: "Designation", type: "string" },
    { accessorKey: "Email", header: "Email", type: "string" },
    { accessorKey: "Month", header: "Month", type: "string" },
    {
      accessorKey: "Allowances",
      header: "Allowances",
      type: "number",
      Cell: ({ cell }) =>
        cell.getValue().toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
    },
    {
      accessorKey: "Deductions",
      header: "Deductions",
      type: "number",
      Cell: ({ cell }) =>
        cell.getValue().toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
    },
    {
      accessorKey: "NetSalary",
      header: "NetSalary",
      type: "number",
    },
  ];

  const handleTooltipClick = (userId) => {
    setSelectedUserId(userId);
    const userPdfUrls = pdfFilesByUser[userId] || [];
    setPdfUrls(userPdfUrls);
    setOpenModal(true);
  };

  const handlePdfClick = (url) => {
    const formattedUrl = `${config.API_URL}/api/pdf/${url.replace(/\\/g, '/')}`;
    setSelectedPdfUrl(formattedUrl);
    const link = document.createElement('a');
    link.href = formattedUrl;
    link.download = formattedUrl.split('/').pop();
    link.click();
  };

    // Function to handle CSV export
  const handleCSV = () => {
    setSnackbar({
      open: true,
      message: "CSV Files successfully downloaded",  // Success message for CSV download
      severity: "success",
    });
  };
  // Function to handle PDF generation
  const handleGeneratePdf = async () => {
    try {
      const token = localStorage.getItem("token");  // Get the token for authentication
      if (!token) {
        setSnackbar({ open: true, message: "User is not authenticated.", severity: "error" });
        return;  // Return early if the user is not authenticated
      }

      const dataToSend = parsedData.length > 0 ? parsedData : JSON.parse(localStorage.getItem("data"));  // Get the data to send
      if (!dataToSend || dataToSend.length === 0) {
        setSnackbar({ open: true, message: "No data available for PDF generation.", severity: "warning" });
        return;  // Return early if no data is available
      }

      // Make the API request to generate PDFs
      const { data } = await axios.post(
        `${config.API_URL}/api/pdf/generate`,
        { data: dataToSend },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const pdfFiles = data.files;  // Extract the PDF files from the response

      // Show success snackbar
      setSnackbar({
        open: true,
        message: "PDFs generated and emails sent successfully!",
        severity: "success",
      });

      let pdfArray = JSON.parse(localStorage.getItem("pdfArray")) || [];  // Get existing PDF data from local storage

      // Update the pdfArray with new PDF files
      pdfFiles.forEach((pdfFile) => {
        const existingIndex = pdfArray.findIndex((item) => item.employeeID === pdfFile.employeeID);

        if (existingIndex !== -1) {
          if (!pdfArray[existingIndex].pdfPaths) pdfArray[existingIndex].pdfPaths = [];
          pdfArray[existingIndex].pdfPaths.push(pdfFile.pdfPath);
        } else {
          pdfArray.push({ employeeID: pdfFile.employeeID, pdfPaths: [pdfFile.pdfPath] });
        }
      });

      // Store the updated pdfArray in local storage
      localStorage.setItem("pdfArray", JSON.stringify(pdfArray));
    } catch (error) {
      console.error("Error generating PDFs:", error);  // Log error if PDF generation fails
      setSnackbar({ open: true, message: "Failed to generate PDFs.", severity: "error" });
    }
  };
  return (
    <div>
            <Box display="flex" justifyContent="space-between" mb={3}>
         <Button variant="contained" color="primary" onClick={handleCSV} sx={{ backgroundColor: "#3f51b5", marginTop: '5px' }}>
         <CSVLink data={tableData} filename="employee_data.csv" style={{ color: "white" }}>
          Export to CSV
         </CSVLink>
        </Button>
        <Button variant="contained" color="secondary" onClick={handleGeneratePdf} sx={{ backgroundColor: "#3f51b5" }}>
          Generate Slip
         </Button>
      </Box>

      <MaterialReactTable
        columns={columns}
        data={cleanData}
        enableFacetedValues={true}
        initialState={{ showColumnFilters: true }}
        sx={{
          width: "100%",
          overflow: "auto",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          "& tbody tr:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
        muiTableBodyCellProps={({ cell }) => ({
          children: (
            <Tooltip title="Show Past Uploads" arrow onClick={() => handleTooltipClick(cell.row.original.EmployeeID)}>
              <span>{cell.getValue()}</span>
            </Tooltip>
          ),
        })}
          muiTableHeadCellProps={{
          style: { fontWeight: "bold", fontSize: "15px" },
        }}

        muiTableBodyRowProps={{
          style: { backgroundColor: "#f5f5f5" },
        }}
      />

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "white", padding: "16px", width: "400px" }}>
          <h2>Past Uploads for {selectedUserId}</h2>
          <List>
            {pdfUrls.length > 0 ? (
              pdfUrls.map((url, index) => (
                <ListItem key={index} button onClick={() => handlePdfClick(url)}>
                  <ListItemText primary={url.split('/').pop()} />
                </ListItem>
              ))
            ) : (
              <ListItem>No PDFs found for this user.</ListItem>
            )}
          </List>
        </Box>
      </Modal>
    {/* Snackbar for messages */}
      <Snackbar
         open={snackbar.open}
         autoHideDuration={6000}
         onClose={() => setSnackbar({ ...snackbar, open: false })}
       >
         <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled"
         >
           {snackbar.message}
         </Alert>
       </Snackbar>
     </div>
  );
};

export default Table;