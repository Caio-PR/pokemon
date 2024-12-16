import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';
import './index.css'
import './components/Components.css'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import Home from "./routes/Home"
import Contacts from './routes/Contacts';
import ErrorPage from './routes/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/contacts",
        element: <Contacts />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
