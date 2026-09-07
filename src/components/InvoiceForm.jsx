import React, { useState } from 'react';

const InvoiceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    issuerName: '',
    issuerId: '',
    clientName: '',
    clientContact: '',
    invoiceNumber: '',
    issueDate: new Date().toISOString().split('T')[0],
  });

  const [items, setItems] = useState([
    { description: '', quantity: 1, price: 0 }
  ]);

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItemRow = () => {
    setItems([...items, { description: '', quantity: 1, price: 0 }]);
  };

  const removeItemRow = (index) => {
    if (items.length === 1) {
      alert('La factura debe tener al menos un ítem.');
      return;
    }
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.issuerName || !formData.issuerId || !formData.clientName || !formData.invoiceNumber) {
      setError('Por favor llena todos los campos requeridos.');
      return;
    }

    for (let item of items) {
      if (!item.description.trim()) {
        setError('Cada ítem debe tener una descripción válida.');
        return;
      }
      if (Number(item.quantity) <= 0 || Number(item.price) <= 0) {
        setError('Las cantidades y precios deben ser mayores a 0.');
        return;
      }
    }

    onSubmit({ ...formData, items });
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 style={{ marginBottom: '1.5rem', color: '#1e3a8a' }}>Nueva Factura</h2>
      {error && <p style={{ color: '#dc2626', marginBottom: '1rem' }}>{error}</p>}

      <h3 className="form-section-title">Datos del Emisor</h3>
      <div className="grid-2">
        <div className="form-group">
          <label>Nombre de la Empresa / Emisor *</label>
          <input
            type="text"
            name="issuerName"
            value={formData.issuerName}
            onChange={handleInputChange}
            placeholder="Ej. TechStore S.A."
            required
          />
        </div>
        <div className="form-group">
          <label>RUC / NIT / ID Fiscal *</label>
          <input
            type="text"
            name="issuerId"
            value={formData.issuerId}
            onChange={handleInputChange}
            placeholder="Ej. 3-101-987654"
            required
          />
        </div>
      </div>

      <h3 className="form-section-title">Datos del Cliente</h3>
      <div className="grid-2">
        <div className="form-group">
          <label>Nombre del Cliente *</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleInputChange}
            placeholder="Ej. Juan Pérez"
            required
          />
        </div>
        <div className="form-group">
          <label>Correo / Dirección</label>
          <input
            type="text"
            name="clientContact"
            value={formData.clientContact}
            onChange={handleInputChange}
            placeholder="juan.perez@email.com"
          />
        </div>
      </div>

      <h3 className="form-section-title">Detalles de Factura</h3>
      <div className="grid-2">
        <div className="form-group">
          <label>N° Factura *</label>
          <input
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleInputChange}
            placeholder="Ej. FAC-001"
            required
          />
        </div>
        <div className="form-group">
          <label>Fecha de Emisión *</label>
          <input
            type="date"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <h3 className="form-section-title">Ítems</h3>
      <table className="items-table">
        <thead>
          <tr>
            <th>Descripción</th>
            <th style={{ width: '100px' }}>Cant.</th>
            <th style={{ width: '120px' }}>Precio ($)</th>
            <th style={{ width: '70px' }}>Acción</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  placeholder="Ej. Teclado"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  style={{ width: '100%', padding: '0.4rem' }}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  style={{ width: '100%', padding: '0.4rem' }}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                  style={{ width: '100%', padding: '0.4rem' }}
                  required
                />
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeItemRow(index)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button type="button" className="btn btn-secondary" onClick={addItemRow} style={{ marginBottom: '1.5rem' }}>
        + Agregar Ítem
      </button>

      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
        Guardar Factura
      </button>
    </form>
  );
};

export default InvoiceForm;
