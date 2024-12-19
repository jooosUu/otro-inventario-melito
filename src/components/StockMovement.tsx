import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useInventoryStore } from '../store/useInventoryStore';

const movementSchema = z.object({
  productId: z.string().min(1, 'Debe seleccionar un producto'),
  quantity: z.number().min(1, 'La cantidad debe ser mayor a 0'),
  type: z.enum(['entrada', 'salida']),
  reason: z.string().min(1, 'Debe especificar una razón'),
});

export const StockMovement: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(movementSchema),
  });

  const { products, updateStock } = useInventoryStore();
  const [movementType, setMovementType] = useState<'entrada' | 'salida'>('entrada');

  const onSubmit = async (data: any) => {
    const quantity = movementType === 'entrada' ? data.quantity : -data.quantity;
    updateStock(data.productId, quantity);
    reset();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <ShoppingCart className="h-6 w-6 text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Movimiento de Stock</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Producto</label>
              <select
                {...register('productId')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Seleccionar producto</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} - Stock actual: {product.stock}
                  </option>
                ))}
              </select>
              {errors.productId && (
                <p className="mt-1 text-sm text-red-600">{errors.productId.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cantidad</label>
              <input
                type="number"
                {...register('quantity', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.quantity && (
                <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Movimiento</label>
            <div className="mt-2 flex space-x-4">
              <button
                type="button"
                onClick={() => setMovementType('entrada')}
                className={`inline-flex items-center px-4 py-2 rounded-md ${
                  movementType === 'entrada'
                    ? 'bg-green-100 text-green-800 border-green-200'
                    : 'bg-gray-100 text-gray-800 border-gray-200'
                } border`}
              >
                <Plus className="h-5 w-5 mr-2" />
                Entrada
              </button>
              <button
                type="button"
                onClick={() => setMovementType('salida')}
                className={`inline-flex items-center px-4 py-2 rounded-md ${
                  movementType === 'salida'
                    ? 'bg-red-100 text-red-800 border-red-200'
                    : 'bg-gray-100 text-gray-800 border-gray-200'
                } border`}
              >
                <Minus className="h-5 w-5 mr-2" />
                Salida
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Razón</label>
            <textarea
              {...register('reason')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Especifique la razón del movimiento..."
            />
            {errors.reason && (
              <p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Registrar Movimiento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};