import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Building2, Save } from 'lucide-react';
import { useConfigStore } from '../../store/useConfigStore';

const configSchema = z.object({
  companyName: z.string().min(1, 'Nombre de empresa requerido'),
  nit: z.string().min(1, 'NIT requerido'),
  contactName: z.string().min(1, 'Nombre de contacto requerido'),
  phone: z.string().min(1, 'Teléfono requerido'),
  address: z.string().min(1, 'Dirección requerida'),
  city: z.string().min(1, 'Ciudad requerida'),
  state: z.string().min(1, 'Región/Provincia requerida'),
  country: z.string().min(1, 'País requerido'),
  businessLine: z.string().min(1, 'Giro empresa requerido'),
  taxType: z.string().min(1, 'Tipo impuesto requerido'),
  logo: z.string().optional(),
});

export const InvoiceConfigForm: React.FC = () => {
  const { config, updateConfig } = useConfigStore();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(configSchema),
    defaultValues: config
  });

  const onSubmit = (data: any) => {
    updateConfig(data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Building2 className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold">Configuración de Facturación</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre Empresa</label>
            <input
              type="text"
              {...register('companyName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.companyName && (
              <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">NIT</label>
            <input
              type="text"
              {...register('nit')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.nit && (
              <p className="mt-1 text-sm text-red-600">{errors.nit.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre Contacto</label>
            <input
              type="text"
              {...register('contactName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.contactName && (
              <p className="mt-1 text-sm text-red-600">{errors.contactName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="text"
              {...register('phone')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Dirección</label>
          <input
            type="text"
            {...register('address')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Ciudad</label>
            <input
              type="text"
              {...register('city')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Región/Provincia</label>
            <input
              type="text"
              {...register('state')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.state && (
              <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">País</label>
            <select
              {...register('country')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Chile">Chile</option>
              <option value="Argentina">Argentina</option>
              <option value="Peru">Perú</option>
              {/* Agregar más países según necesidad */}
            </select>
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Giro Empresa</label>
            <input
              type="text"
              {...register('businessLine')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.businessLine && (
              <p className="mt-1 text-sm text-red-600">{errors.businessLine.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo Impuesto</label>
            <select
              {...register('taxType')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="incluido">Incluido</option>
              <option value="excluido">Excluido</option>
            </select>
            {errors.taxType && (
              <p className="mt-1 text-sm text-red-600">{errors.taxType.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Logo Corporativo</label>
          <div className="mt-1 flex items-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  // Aquí manejar la subida del logo
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    updateConfig({ ...config, logo: reader.result as string });
                  };
                  reader.readAsDataURL(e.target.files[0]);
                }
              }}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="h-4 w-4 mr-2" />
            Guardar Configuración
          </button>
        </div>
      </form>
    </div>
  );
};