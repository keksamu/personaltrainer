import React from 'react';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router';
import * as ReactDOM from 'react-dom/client';
import Training from './pages/Training';
import Customer from './pages/Customer';
import Home from './pages/Home';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [                       
      {
        element: <Home />,
        index: true                   
      },
      {
        path: "training",                
        element: <Training />,
      },
      {
        path: "customer",
        element: <Customer />,
      },
    ]
  }
]);

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);