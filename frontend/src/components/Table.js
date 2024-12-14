import React, { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { CSVLink } from "react-csv";
import { Button, Box, Tooltip, Modal, List, ListItem, ListItemText } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updatePdfFilesByUser, saveGeneratedPdfs, updatePdfFiles } from "../app/features/slices/fileSlice";
import axios from "axios";
import { format } from "date-fns";
import config from "../config";

const Table = () => {
  const dispatch = useDispatch();
  const parsedData = useSelector((state) => state.file.parsedData);
  const pdfFilesByUser = useSelector((state) => state.file.pdfFilesByUser);

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

  const handleGeneratePdf = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User is not authenticated. Token not found.");
        return;
      }

      const dataToSend = parsedData.length > 0 ? parsedData : JSON.parse(localStorage.getItem("data"));

      if (!dataToSend || dataToSend.length === 0) {
        alert("No data available for PDF generation.");
        return;
      }

      const { data } = await axios.post(
        `${config.API_URL}/api/pdf/generate`,
        { data: dataToSend },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const pdfFiles = data.files;
      const emailData = dataToSend.map((employee) => {
        const pdfFile = pdfFiles.find((file) => file.employeeID === employee.EmployeeID);
        return {
          employee_id: employee.EmployeeID,
          employee_name: employee.Name,
          to: employee.Email,
          from: "unikrewapp@outlook.com",
          subject: `Your Monthly Salary Slip for ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}`,
          body: `Dear ${employee.Name},\n\nPlease find your salary slip attached for the month of ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}.\n\nBest regards,\nYour Company.`,
          attachment_path: pdfFile ? pdfFile.pdfPath : "",
        };
      });

      await axios.post(
        `${config.API_URL}/api/email/send`,
        { emailData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("PDFs generated and emails sent successfully!");
      let pdfArray = JSON.parse(localStorage.getItem("pdfArray")) || [];

      // Loop through the newly generated pdfFiles to add them to the pdfArray
      pdfFiles.forEach(pdfFile => {
        const existingEmployeeIndex = pdfArray.findIndex(item => item.employeeID === pdfFile.employeeID);

        if (existingEmployeeIndex !== -1) {
          // If the employee already exists, ensure that pdfPaths is an array before pushing
          if (!pdfArray[existingEmployeeIndex].pdfPaths) {
            pdfArray[existingEmployeeIndex].pdfPaths = []; // Initialize pdfPaths if it's undefined
          }
          pdfArray[existingEmployeeIndex].pdfPaths.push(pdfFile.pdfPath);
        } else {
          // If the employee doesn't exist, create a new entry with pdfPaths as an array
          pdfArray.push({
            employeeID: pdfFile.employeeID,
            pdfPaths: [pdfFile.pdfPath]
          });
        }
      });

      // Save the updated pdfArray back to localStorage
      localStorage.setItem("pdfArray", JSON.stringify(pdfArray));

    } catch (error) {
      console.error("Error generating PDFs or sending emails:", error);
      alert("Failed to generate PDFs or send emails.");
    }
  };

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <Button variant="contained" color="primary">
          <CSVLink data={parsedData} filename="employee_data.csv" style={{ color: "white", textDecoration: "none" }}>
            Export to CSV
          </CSVLink>
        </Button>
        <Button variant="contained" color="secondary" onClick={handleGeneratePdf}>
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
    </div>
  );
};

export default Table;
