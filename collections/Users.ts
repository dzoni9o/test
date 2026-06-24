import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Sistem',
  },
  fields: [
    {
      name: 'firstName',
      label: 'Ime',
      type: 'text',
    },
    {
      name: 'lastName',
      label: 'Prezime',
      type: 'text',
    },
    {
      name: 'phone',
      label: 'Telefon',
      type: 'text',
    },
    {
      name: 'role',
      label: 'Uloga',
      type: 'select',
      defaultValue: 'customer',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Kupac', value: 'customer' },
        { label: 'Veleprodaja (B2B)', value: 'b2b' },
      ],
    },
    {
      name: 'company',
      label: 'Firma',
      type: 'text',
    },
    {
      name: 'pib',
      label: 'PIB',
      type: 'text',
    },
    {
      name: 'addresses',
      label: 'Adrese',
      type: 'array',
      fields: [
        { name: 'label', label: 'Naziv (npr. Kuća)', type: 'text' },
        { name: 'street', label: 'Ulica i broj', type: 'text' },
        { name: 'city', label: 'Grad', type: 'text' },
        { name: 'zip', label: 'Poštanski broj', type: 'text' },
        { name: 'isDefault', label: 'Podrazumevana', type: 'checkbox' },
      ],
    },
  ],
}
