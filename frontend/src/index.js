import React from "react";
import ReactDOM from "react-dom/client"; // Updated import for React 18
import { Provider } from "react-redux";
import { store} from "../src/app/features/store/store";
import App from "./App";


 
const container = document.getElementById("root"); // Get the root DOM node
const root = ReactDOM.createRoot(container); // Create a React root
console.log("Starting app...");
root.render(
  <Provider store={store}>
      <App />
  </Provider>
);
