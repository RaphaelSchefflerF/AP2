import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import PaginaInicial from './Paginas/PaginaInicial';


const roteador = createBrowserRouter ([
  {path: '/', element: <PaginaInicial/>},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {roteador}/>
  </React.StrictMode>
);


reportWebVitals();
