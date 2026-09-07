import React from 'react';
import { useNavigate } from 'react-router-dom';

const InvoiceList = ({ invoices }) => {
  const navigate = useNavigate();

  if (!invoices || invoices.length === 0) {
    return (
      <div className="card empty-state">
        <h3>No hay facturas registradas</h3>
        <p>Crea tu primera factura desde el menú superior.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 style={{ marginBottom: '1.5rem', color: '#1e3a8a' }}>Listado de Facturas</h2>
      <table className="items-table">
        <thead>
          <tr>
            <th>N° Factura</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total ($)</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id}>
              <td><strong>{inv.invoiceNumber}</strong></td>
              <td>{inv.clientName}</td>
              <td>{inv.issueDate}</td>
              <td>${inv.total.toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/invoices/${inv.id}`)}
                >
                  Ver Factura
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;