import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  parsedData: [],
  pdfFilesByUser: {}, // Store pdf URLs by user ID
    status: "idle",
  pdfUrls:[],

};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    updateParsedData: (state, action) => {
      state.parsedData = action.payload;
    },
    saveGeneratedPdfs(state, action) {
      const files = action.payload.files;
      files.forEach(({ employeeID, pdfPath }) => {
        if (!state.pdfFilesByUser[employeeID]) {
          state.pdfFilesByUser[employeeID] = [];
        }
        state.pdfFilesByUser[employeeID].push(pdfPath);
      });
    },
              updatePdfFiles: (state, action) => {
            state.pdfUrls = action.payload;
            console.log("The pdf Files are",state.pdfUrls)
          },
    updateStatus: (state, action) => {
                  state.status = action.payload;
                },
  },
});

export const { updateParsedData,updatePdfFilesByUser ,updatePdfFiles,updateStatus,saveGeneratedPdfs } = fileSlice.actions;
export default fileSlice.reducer;
