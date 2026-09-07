import React from 'react';

const InvoiceView = ({ invoice }) => {
  if (!invoice) return <p>No se encontró la factura.</p>;

  return (
    <div className="invoice-box">
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={() => window.print()} className="btn btn-print">
          🖨️ Imprimir / Guardar PDF
        </button>
      </div>

      <div className="invoice-header">
        <div>
          <h1>FACTURA</h1>
          <p><strong>{invoice.issuerName}</strong></p>
          <p>ID / RUC: {invoice.issuerId}</p>
        </div>
        <div className="invoice-details">
          <p><strong>Factura N°:</strong> {invoice.invoiceNumber}</p>
          <p><strong>Fecha:</strong> {invoice.issueDate}</p>
        </div>
      </div>

      <div className="invoice-parties">
        <div>
          <h4>Facturado a:</h4>
          <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{invoice.clientName}</p>
          <p>{invoice.clientContact}</p>
        </div>
      </div>

      <table className="items-table">
        <thead>
          <tr>
            <th>Descripción</th>
            <th style={{ textAlign: 'center' }}>Cantidad</th>
            <th style={{ textAlign: 'right' }}>Precio Unitario</th>
            <th style={{ textAlign: 'right' }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td style={{ textAlign: 'center' }}>{item.quantity}</td>
              <td style={{ textAlign: 'right' }}>${Number(item.price).toFixed(2)}</td>
              <td style={{ textAlign: 'right' }}>
                ${(Number(item.quantity) * Number(item.price)).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="invoice-totals">
        <div className="total-row">
          <span>Subtotal:</span>
          <span>${invoice.subtotal.toFixed(2)}</span>
        </div>
        <div className="total-row">
          <span>IVA (13%):</span>
          <span>${invoice.tax.toFixed(2)}</span>
        </div>
        <div className="total-row total-final">
          <span>Total:</span>
          <span>${invoice.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;