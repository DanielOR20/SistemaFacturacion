import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CreateInvoicePage from '../pages/CreateInvoicePage';
import InvoicesListPage from '../pages/InvoicesListPage';
import ViewInvoicePage from '../pages/ViewInvoicePage';

const AppRouter = () => {
  return (
    <>
      <nav className="navbar">
        <h2>Sistema de Facturación</h2>
        <div className="nav-links">
          <Link to="/">Crear Factura</Link>
          <Link to="/invoices">Listado de Facturas</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<CreateInvoicePage />} />
        <Route path="/invoices" element={<InvoicesListPage />} />
        <Route path="/invoices/:id" element={<ViewInvoicePage />} />
      </Routes>
    </>
  );
};

export default AppRouter;