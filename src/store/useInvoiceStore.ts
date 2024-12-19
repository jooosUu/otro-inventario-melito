import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Invoice } from '../types/inventory';

interface InvoiceStore {
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
  updateInvoiceStatus: (id: string, status: 'PENDING' | 'APPROVED' | 'REJECTED') => void;
}

export const useInvoiceStore = create<InvoiceStore>()(
  persist(
    (set) => ({
      invoices: [],
      addInvoice: (invoice) => 
        set((state) => ({ invoices: [...state.invoices, invoice] })),
      updateInvoiceStatus: (id, status) =>
        set((state) => ({
          invoices: state.invoices.map((invoice) =>
            invoice.id === id ? { ...invoice, status } : invoice
          ),
        })),
    }),
    {
      name: 'invoice-storage',
    }
  )
);