// src/services/invoiceService.js
const API_URL = 'http://localhost:3001/invoices';
const LOCAL_KEY = 'invoices_backup';

const calculateTotals = (items) => {
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.quantity) * Number(item.price),
    0
  );
  const tax = subtotal * 0.13;
  const total = subtotal + tax;
  return { subtotal, tax, total };
};

export const getInvoices = async () => {
  try {
    const res = await fetch(API_URL);
    if (res.ok) return await res.json();
  } catch {
    // Si json-server no está encendido, lee el respaldo
  }
  const local = localStorage.getItem(LOCAL_KEY);
  return local ? JSON.parse(local) : [];
};

export const getInvoiceById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (res.ok) return await res.json();
  } catch {
    // Si json-server no está encendido, busca en respaldo
  }
  const invoices = await getInvoices();
  return invoices.find((inv) => String(inv.id) === String(id));
};

export const saveInvoice = async (invoiceData) => {
  const { subtotal, tax, total } = calculateTotals(invoiceData.items);
  const newInvoice = {
    ...invoiceData,
    id: Date.now().toString(),
    subtotal,
    tax,
    total,
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInvoice),
    });
    if (res.ok) return await res.json();
  } catch {
    // Si json-server no responde, guarda en respaldo sin lanzar error
  }

  const existing = await getInvoices();
  existing.push(newInvoice);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(existing));
  return newInvoice;
};