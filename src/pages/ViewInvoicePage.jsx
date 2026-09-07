import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InvoiceView from '../components/InvoiceView';
import { getInvoiceById } from '../services/invoiceService';

const ViewInvoicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        setLoading(true);
        const data = await getInvoiceById(id);
        setInvoice(data);
      } catch (err) {
        console.error(err);
        setError('No se pudo encontrar la factura en db.json.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceData();
  }, [id]);

  if (loading) {
    return (
      <div className="container card empty-state">
        <p>Consultando factura en db.json...</p>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="container card empty-state">
        <h3>{error || 'Factura no encontrada'}</h3>
        <button className="btn btn-secondary" onClick={() => navigate('/invoices')}>
          Volver al listado
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <button 
        className="btn btn-secondary" 
        onClick={() => navigate('/invoices')}
        style={{ marginBottom: '1rem' }}
      >
        ← Volver al Listado
      </button>
      <InvoiceView invoice={invoice} />
    </div>
  );
};

export default ViewInvoicePage;