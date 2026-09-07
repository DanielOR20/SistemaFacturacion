import React from 'react';
import { useNavigate } from 'react-router-dom';
import InvoiceForm from '../components/InvoiceForm';
import { saveInvoice } from '../services/invoiceService';

const CreateInvoicePage = () => {
  const navigate = useNavigate();

  const handleSave = async (invoiceData) => {
    try {
      const saved = await saveInvoice(invoiceData);
      navigate(`/invoices/${saved.id}`);
    } catch (error) {
      console.error(error);
      alert('Error al guardar en db.json');
    }
  };

  return (
    <div className="container">
      <InvoiceForm onSubmit={handleSave} />
    </div>
  );
};

export default CreateInvoicePage;
