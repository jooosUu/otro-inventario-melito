import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Package, FileText, BarChart2, ShoppingCart, Package2 } from 'lucide-react';
import { BarcodeScanner } from './components/BarcodeScanner';
import { ProductList } from './components/ProductList';
import { Dashboard } from './components/Dashboard';
import { InvoiceForm } from './components/InvoiceForm';
import { InvoiceList } from './components/InvoiceList';
import { StockMovement } from './components/StockMovement';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  Sistema de Inventario
                </span>
              </div>
              <div className="flex space-x-8">
                <Link to="/" className="flex items-center text-gray-700 hover:text-blue-600">
                  <BarChart2 className="h-5 w-5 mr-1" />
                  Dashboard
                </Link>
                <Link to="/productos" className="flex items-center text-gray-700 hover:text-blue-600">
                  <Package2 className="h-5 w-5 mr-1" />
                  Productos
                </Link>
                <Link to="/movimientos" className="flex items-center text-gray-700 hover:text-blue-600">
                  <ShoppingCart className="h-5 w-5 mr-1" />
                  Movimientos
                </Link>
                <Link to="/facturas" className="flex items-center text-gray-700 hover:text-blue-600">
                  <FileText className="h-5 w-5 mr-1" />
                  Facturas
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/productos" element={
                <div className="space-y-6">
                  <BarcodeScanner />
                  <ProductList />
                </div>
              } />
              <Route path="/movimientos" element={<StockMovement />} />
              <Route path="/facturas/*" element={
                <Routes>
                  <Route path="/" element={<InvoiceList />} />
                  <Route path="nueva" element={<InvoiceForm />} />
                </Routes>
              } />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;