import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: { singular: 'Narudžbina', plural: 'Narudžbine' },
  admin: {
    useAsTitle: 'orderNumber',
    group: 'Prodaja',
    defaultColumns: ['orderNumber', 'status', 'total', 'customer', 'createdAt'],
  },
  fields: [
    {
      name: 'orderNumber',
      label: 'Broj narudžbine',
      type: 'text',
      unique: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Čeka potvrdu', value: 'pending' },
        { label: 'Potvrđena', value: 'confirmed' },
        { label: 'U obradi', value: 'processing' },
        { label: 'Poslata', value: 'shipped' },
        { label: 'Isporučena', value: 'delivered' },
        { label: 'Otkazana', value: 'cancelled' },
        { label: 'Refundirana', value: 'refunded' },
      ],
    },
    {
      name: 'customer',
      label: 'Kupac',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'customerInfo',
      label: 'Podaci o kupcu',
      type: 'group',
      fields: [
        { name: 'firstName', label: 'Ime', type: 'text' },
        { name: 'lastName', label: 'Prezime', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'phone', label: 'Telefon', type: 'text' },
        { name: 'company', label: 'Firma', type: 'text' },
        { name: 'pib', label: 'PIB', type: 'text' },
      ],
    },
    {
      name: 'shippingAddress',
      label: 'Adresa dostave',
      type: 'group',
      fields: [
        { name: 'street', label: 'Ulica i broj', type: 'text' },
        { name: 'city', label: 'Grad', type: 'text' },
        { name: 'zip', label: 'Poštanski broj', type: 'text' },
        { name: 'country', label: 'Država', type: 'text', defaultValue: 'Srbija' },
      ],
    },
    {
      name: 'items',
      label: 'Stavke narudžbine',
      type: 'array',
      fields: [
        {
          name: 'product',
          label: 'Proizvod',
          type: 'relationship',
          relationTo: 'products',
        },
        { name: 'productName', label: 'Naziv (snapshot)', type: 'text' },
        { name: 'sku', label: 'SKU (snapshot)', type: 'text' },
        { name: 'quantity', label: 'Količina', type: 'number', min: 1 },
        { name: 'price', label: 'Cena po kom (bez PDV)', type: 'number' },
        { name: 'priceWithVat', label: 'Cena sa PDV', type: 'number' },
        { name: 'subtotal', label: 'Ukupno', type: 'number' },
      ],
    },
    {
      name: 'subtotal',
      label: 'Iznos bez PDV',
      type: 'number',
    },
    {
      name: 'vatAmount',
      label: 'PDV (20%)',
      type: 'number',
    },
    {
      name: 'shippingCost',
      label: 'Troškovi dostave',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'discount',
      label: 'Popust',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'total',
      label: 'Ukupno za naplatu',
      type: 'number',
    },
    {
      name: 'paymentMethod',
      label: 'Način plaćanja',
      type: 'select',
      options: [
        { label: 'Kartica', value: 'card' },
        { label: 'Pouzećem', value: 'cod' },
        { label: 'Virmanski (R1)', value: 'bank_transfer' },
        { label: 'PaySpot', value: 'payspot' },
      ],
    },
    {
      name: 'paymentStatus',
      label: 'Status plaćanja',
      type: 'select',
      defaultValue: 'unpaid',
      options: [
        { label: 'Nije plaćeno', value: 'unpaid' },
        { label: 'Plaćeno', value: 'paid' },
        { label: 'Refundirano', value: 'refunded' },
      ],
    },
    {
      name: 'invoiceType',
      label: 'Tip računa',
      type: 'select',
      defaultValue: 'r2',
      options: [
        { label: 'R1 (pravno lice)', value: 'r1' },
        { label: 'R2 (fizičko lice)', value: 'r2' },
      ],
    },
    {
      name: 'notes',
      label: 'Napomena kupca',
      type: 'textarea',
    },
    {
      name: 'trackingNumber',
      label: 'Broj pošiljke',
      type: 'text',
    },
  ],
}
