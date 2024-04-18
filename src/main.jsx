import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


/**
 * Renders the main React application component to the DOM element with the ID 'root'.
 * This is the entry point for the application, where the top-level App component is rendered
 * within a React.StrictMode context.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
