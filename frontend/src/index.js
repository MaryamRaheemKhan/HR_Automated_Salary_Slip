// // import React from 'react';
// // import ReactDOM from 'react-dom/client';
// // import './index.css';
// // import App from './App';
// // import reportWebVitals from './reportWebVitals';

// // const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>
// // );

// // // If you want to start measuring performance in your app, pass a function
// // // to log results (for example: reportWebVitals(console.log))
// // // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// // reportWebVitals();

// // import React from "react";
// // import ReactDOM from "react-dom";
// // import { Provider } from "react-redux";
// // import { PersistGate } from "redux-persist/integration/react";
// // import { store, persistor } from "../src/app/features/store/store";
// // import App from "./App";

// import React from "react";
// import ReactDOM from "react-dom/client"; // Updated import for React 18
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import App from "./App";
// import { store, persistor } from "../src/app/features/store/store";

// // ReactDOM.render(
// //   <Provider store={store}>
// //     <PersistGate loading={null} persistor={persistor}>
// //       <App />
// //     </PersistGate>
// //   </Provider>,
// //   document.getElementById("root")
// // );
// const container = document.getElementById("root"); // Get the root DOM node
// const root = ReactDOM.createRoot(container); // Create a React root

// root.render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <App />
//     </PersistGate>
//   </Provider>
// );

import React from "react";
import ReactDOM from "react-dom/client"; // Updated import for React 18
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../src/app/features/store/store";
import App from "./App";


 
const container = document.getElementById("root"); // Get the root DOM node
const root = ReactDOM.createRoot(container); // Create a React root
console.log("Starting app...");
root.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <App />
    {/* </PersistGate> */}
  </Provider>
);
