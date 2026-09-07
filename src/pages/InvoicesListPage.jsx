import React, { useState, useEffect } from 'react';
import InvoiceList from '../components/invoiceList';
import { getInvoices } from '../services/invoiceService';

const InvoicesListPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const data = await getInvoices();
        setInvoices(data);
      } catch (error) {
        console.error('Error al cargar facturas desde db.json:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  if (loading) {
    return (
      <div className="container card empty-state">
        <p>Cargando facturas desde db.json...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <InvoiceList invoices={invoices} />
    </div>
  );
};

export default InvoicesListPage;