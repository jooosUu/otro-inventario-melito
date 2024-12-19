import React, { useState } from 'react';
import { useInventoryStore } from '../../store/useInventoryStore';
import { Scanner } from './Scanner';
import { Cart } from './Cart';
import { PaymentModal } from './PaymentModal';
import { ShoppingCart, CreditCard, Package } from 'lucide-react';

export const POSScreen: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  
  const handleScan = (barcode: string) => {
    const product = useInventoryStore.getState().getProduct(barcode);
    if (product) {
      setCart(current => {
        const existing = current.find(item => item.product.id === product.id);
        if (existing) {
          return current.map(item => 
            item.product.id === product.id 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...current, { product, quantity: 1 }];
      });
    }
  };

  const handlePayment = async (paymentDetails: PaymentDetails) => {
    // Procesar pago y actualizar inventario
    const { updateStock } = useInventoryStore.getState();
    
    // Reducir stock de productos vendidos
    cart.forEach(item => {
      updateStock(item.product.id, -item.quantity);
    });
    
    // Crear factura
    // Limpiar carrito
    setCart([]);
    setShowPayment(false);
  };

  return (
    <div className="grid grid-cols-12 gap-4 h-screen">
      <div className="col-span-8 bg-white p-4 rounded-lg shadow">
        <Scanner onScan={handleScan} />
        <Cart items={cart} onUpdateQuantity={(id, qty) => {
          setCart(current => 
            current.map(item => 
              item.product.id === id ? { ...item, quantity: qty } : item
            )
          );
        }} />
      </div>
      
      <div className="col-span-4 bg-white p-4 rounded-lg shadow">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Total: ${cart.reduce((sum, item) => 
            sum + (item.product.price.toNumber() * item.quantity), 0).toFixed(2)}</h2>
          
          <button
            onClick={() => setShowPayment(true)}
            className="w-full py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center"
          >
            <CreditCard className="mr-2" />
            Procesar Pago
          </button>
        </div>
      </div>

      {showPayment && (
        <PaymentModal 
          total={cart.reduce((sum, item) => 
            sum + (item.product.price.toNumber() * item.quantity), 0)}
          onComplete={handlePayment}
          onCancel={() => setShowPayment(false)}
        />
      )}
    </div>
  );
};