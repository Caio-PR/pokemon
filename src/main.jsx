import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';
import './index.css'
import './components/css/Components.css'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import Home from "./routes/jsx/Home.jsx"
import Contacts from './routes/jsx/Contacts.jsx';
import ErrorPage from './routes/jsx/ErrorPage.jsx';
import Pokemon from './routes/jsx/Pokemon.jsx';

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
      },
      {
        path: "/pokemon/:pokemonName",
        element: <Pokemon />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
