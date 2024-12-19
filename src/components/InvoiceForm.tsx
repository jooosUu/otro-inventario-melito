import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Decimal } from 'decimal.js';
import { FileText, Plus, Trash2 } from 'lucide-react';
import { useInventoryStore } from '../store/useInventoryStore';

const invoiceSchema = z.object({
  customerName: z.string().min(1, 'El nombre es requerido'),
  customerNit: z.string().min(1, 'El NIT es requerido'),
  customerAddress: z.string().min(1, 'La dirección es requerida'),
  customerPhone: z.string().optional(),
  customerEmail: z.string().email().optional(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1),
    unitPrice: z.string().transform(val => new Decimal(val)),
  })).min(1, 'Debe agregar al menos un producto')
});

export const InvoiceForm: React.FC = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      items: [{ productId: '', quantity: 1, unitPrice: '' }]
    }
  });

  const products = useInventoryStore(state => state.products);

  const onSubmit = async (data: any) => {
    try {
      const response = await window.electron.invoke('save-invoice', data);
      console.log('Invoice saved:', response);
    } catch (error) {
      console.error('Error saving invoice:', error);
    }
  };

  const items = watch('items');

  const addItem = () => {
    setValue('items', [...items, { productId: '', quantity: 1, unitPrice: '' }]);
  };

  const removeItem = (index: number) => {
    setValue('items', items.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <FileText className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Nueva Factura Electrónica</h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre del Cliente</label>
          <input
            type="text"
            {...register('customerName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.customerName && (
            <p className="mt-1 text-sm text-red-600">{errors.customerName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">NIT/Cédula</label>
          <input
            type="text"
            {...register('customerNit')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.customerNit && (
            <p className="mt-1 text-sm text-red-600">{errors.customerNit.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Dirección</label>
        <input
          type="text"
          {...register('customerAddress')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.customerAddress && (
          <p className="mt-1 text-sm text-red-600">{errors.customerAddress.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="tel"
            {...register('customerPhone')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('customerEmail')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Productos</h3>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Agregar Producto
          </button>
        </div>

        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <select
              {...register(`items.${index}.productId`)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Seleccionar producto</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} - ${product.price.toString()}
                </option>
              ))}
            </select>

            <input
              type="number"
              {...register(`items.${index}.quantity`)}
              placeholder="Cantidad"
              className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-2 text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Generar Factura Electrónica
        </button>
      </div>
    </form>
  );
};