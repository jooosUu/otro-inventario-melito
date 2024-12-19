import React, { useState } from 'react';
import { useInventoryStore } from '../store/useInventoryStore';
import { Barcode, Package2, Pill, Plus } from 'lucide-react';
import { Decimal } from 'decimal.js';

export const BarcodeScanner: React.FC = () => {
  const [barcode, setBarcode] = useState('');
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'minimarket',
    price: '',
    cost: '',
    stock: '1',
    expirationDate: '',
  });

  const { getProduct, addProduct } = useInventoryStore();

  const handleBarcodeInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const product = getProduct(barcode);
      if (product) {
        // Product found
        console.log('Product found:', product);
      } else {
        // Product not found, show form
        setShowNewProductForm(true);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      id: crypto.randomUUID(),
      barcode,
      name: newProduct.name,
      category: newProduct.category as 'minimarket' | 'pharmacy',
      price: new Decimal(newProduct.price),
      cost: new Decimal(newProduct.cost),
      stock: parseInt(newProduct.stock),
      expirationDate: newProduct.expirationDate ? new Date(newProduct.expirationDate) : undefined,
      lastUpdated: new Date(),
      supplierId: '1', // This should be selected from a supplier list
    });
    setShowNewProductForm(false);
    setBarcode('');
    setNewProduct({
      name: '',
      category: 'minimarket',
      price: '',
      cost: '',
      stock: '1',
      expirationDate: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Escanear Producto</h2>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Barcode className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            onKeyDown={handleBarcodeInput}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Escanear código de barras..."
            autoFocus
          />
        </div>
      </div>

      {showNewProductForm && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Nuevo Producto</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                required
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Categoría</label>
              <div className="mt-1 flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="minimarket"
                    checked={newProduct.category === 'minimarket'}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <Package2 className="ml-2 h-5 w-5 text-blue-500" />
                  <span className="ml-2">Minimarket</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="pharmacy"
                    checked={newProduct.category === 'pharmacy'}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="form-radio h-4 w-4 text-green-600"
                  />
                  <Pill className="ml-2 h-5 w-5 text-green-500" />
                  <span className="ml-2">Farmacia</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Precio Venta</label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Precio Costo</label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={newProduct.cost}
                  onChange={(e) => setNewProduct({ ...newProduct, cost: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Cantidad</label>
                <input
                  type="number"
                  required
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha Vencimiento</label>
                <input
                  type="date"
                  value={newProduct.expirationDate}
                  onChange={(e) => setNewProduct({ ...newProduct, expirationDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowNewProductForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Producto
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};