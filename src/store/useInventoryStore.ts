import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, InventoryStats } from '../types/inventory';

interface InventoryStore {
  products: Product[];
  stats: InventoryStats;
  addProduct: (product: Product) => void;
  updateStock: (id: string, quantity: number) => void;
  getProduct: (barcode: string) => Product | undefined;
  calculateStats: () => void;
}

export const useInventoryStore = create<InventoryStore>()(
  persist(
    (set, get) => ({
      products: [],
      stats: {
        totalProducts: 0,
        totalValue: 0,
        lowStock: 0,
        recentMovements: 0,
      },
      addProduct: (product) => {
        set((state) => {
          const products = [...state.products, product];
          return {
            products,
            stats: calculateStats(products),
          };
        });
      },
      updateStock: (id, quantity) => {
        set((state) => {
          const products = state.products.map((product) =>
            product.id === id
              ? { ...product, stock: product.stock + quantity, lastUpdated: new Date() }
              : product
          );
          return {
            products,
            stats: calculateStats(products),
          };
        });
      },
      getProduct: (barcode) => {
        return get().products.find((product) => product.barcode === barcode);
      },
      calculateStats: () => {
        set((state) => ({
          stats: calculateStats(state.products),
        }));
      },
    }),
    {
      name: 'inventory-storage',
    }
  )
);

const calculateStats = (products: Product[]): InventoryStats => {
  return {
    totalProducts: products.length,
    totalValue: products.reduce((acc, product) => acc + (product.price.toNumber() * product.stock), 0),
    lowStock: products.filter((product) => product.stock < 5).length,
    recentMovements: products.filter(
      (product) => 
        new Date().getTime() - new Date(product.lastUpdated).getTime() < 24 * 60 * 60 * 1000
    ).length,
  };
};