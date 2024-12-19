import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ConfigState {
  config: {
    companyName: string;
    nit: string;
    contactName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    businessLine: string;
    taxType: string;
    logo?: string;
  };
  updateConfig: (newConfig: Partial<ConfigState['config']>) => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      config: {
        companyName: '',
        nit: '',
        contactName: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: 'Chile',
        businessLine: '',
        taxType: 'incluido',
      },
      updateConfig: (newConfig) =>
        set((state) => ({
          config: { ...state.config, ...newConfig },
        })),
    }),
    {
      name: 'invoice-config',
    }
  )
);