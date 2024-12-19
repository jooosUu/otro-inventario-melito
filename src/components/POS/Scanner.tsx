import React, { useState } from 'react';
import { Barcode } from 'lucide-react';

interface ScannerProps {
  onScan: (barcode: string) => void;
}

export const Scanner: React.FC<ScannerProps> = ({ onScan }) => {
  const [barcode, setBarcode] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && barcode) {
      onScan(barcode);
      setBarcode('');
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
        <Barcode className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        onKeyDown={handleKeyDown}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
        placeholder="Escanear producto..."
        autoFocus
      />
    </div>
  );
};