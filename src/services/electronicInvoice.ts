import { Invoice } from '../types/inventory';
import { format } from 'date-fns';
import { Builder } from 'xml2js';

export const generateDianXML = async (invoice: Invoice): Promise<string> => {
  const builder = new Builder();
  
  // Estructura XML según especificaciones DIAN
  const invoiceData = {
    'fe:Invoice': {
      '$': {
        'xmlns:fe': 'http://www.dian.gov.co/contratos/facturaelectronica/v1',
        'xmlns:cac': 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
        'xmlns:cbc': 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
      },
      'cbc:UBLVersionID': '2.1',
      'cbc:CustomizationID': '10',
      'cbc:ProfileID': 'DIAN 2.1',
      'cbc:ID': invoice.number,
      'cbc:IssueDate': format(invoice.date, 'yyyy-MM-dd'),
      'cbc:IssueTime': format(invoice.date, 'HH:mm:ss'),
      'cbc:InvoiceTypeCode': '01',
      'fe:AccountingSupplierParty': {
        'fe:Party': {
          'cac:PartyIdentification': {
            'cbc:ID': {
              '_': process.env.COMPANY_NIT,
              '$': { schemeID: '31' }
            }
          },
          'cac:PartyName': {
            'cbc:Name': process.env.COMPANY_NAME
          }
        }
      },
      'fe:AccountingCustomerParty': {
        'fe:Party': {
          'cac:PartyIdentification': {
            'cbc:ID': {
              '_': invoice.customerNit,
              '$': { schemeID: '31' }
            }
          },
          'cac:PartyName': {
            'cbc:Name': invoice.customerName
          }
        }
      },
      'fe:LegalMonetaryTotal': {
        'cbc:LineExtensionAmount': {
          '_': invoice.subtotal.toString(),
          '$': { currencyID: 'COP' }
        },
        'cbc:TaxInclusiveAmount': {
          '_': invoice.total.toString(),
          '$': { currencyID: 'COP' }
        },
        'cbc:PayableAmount': {
          '_': invoice.total.toString(),
          '$': { currencyID: 'COP' }
        }
      },
      'fe:InvoiceLine': invoice.items.map((item, index) => ({
        'cbc:ID': index + 1,
        'cbc:InvoicedQuantity': item.quantity,
        'cbc:LineExtensionAmount': {
          '_': item.total.toString(),
          '$': { currencyID: 'COP' }
        },
        'fe:Item': {
          'cbc:Description': item.product.name,
          'cac:SellersItemIdentification': {
            'cbc:ID': item.product.barcode
          }
        },
        'fe:Price': {
          'cbc:PriceAmount': {
            '_': item.unitPrice.toString(),
            '$': { currencyID: 'COP' }
          }
        }
      }))
    }
  };

  return builder.buildObject(invoiceData);
};

export const signXML = async (xml: string): Promise<string> => {
  // Aquí iría la implementación de la firma digital según especificaciones DIAN
  // Se requiere certificado digital
  return xml;
};

export const sendToAuthority = async (signedXml: string): Promise<{ cufe: string, qrCode: string }> => {
  // Aquí iría la implementación del envío a la DIAN
  // Por ahora retornamos datos de ejemplo
  return {
    cufe: `CUFE${Date.now()}`,
    qrCode: `https://catalogo-vpfe.dian.gov.co/document/searchqr?documentkey=CUFE${Date.now()}`
  };
};