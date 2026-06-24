import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Podešavanja sajta',
  admin: {
    group: 'Konfiguracija',
  },
  fields: [
    {
      name: 'general',
      label: 'Opšte',
      type: 'group',
      fields: [
        {
          name: 'shopName',
          label: 'Naziv prodavnice',
          type: 'text',
          defaultValue: 'ElektroIN',
          required: true,
        },
        {
          name: 'tagline',
          label: 'Tagline',
          type: 'text',
          defaultValue: 'Elektromatrijal za profesionalce',
        },
        {
          name: 'email',
          label: 'Kontakt email',
          type: 'email',
        },
        {
          name: 'phone',
          label: 'Telefon',
          type: 'text',
        },
        {
          name: 'address',
          label: 'Adresa',
          type: 'textarea',
        },
        {
          name: 'workingHours',
          label: 'Radno vreme',
          type: 'text',
          defaultValue: 'Pon–Pet 08–16h',
        },
      ],
    },
    {
      name: 'shipping',
      label: 'Dostava',
      type: 'group',
      fields: [
        {
          name: 'freeShippingThreshold',
          label: 'Besplatna dostava od (RSD)',
          type: 'number',
          defaultValue: 5000,
        },
        {
          name: 'shippingCost',
          label: 'Cena dostave (RSD)',
          type: 'number',
          defaultValue: 350,
        },
        {
          name: 'freePickup',
          label: 'Besplatno preuzimanje u prodavnici',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'pickupAddress',
          label: 'Adresa preuzimanja',
          type: 'text',
        },
      ],
    },
    {
      name: 'pricing',
      label: 'Cene i PDV',
      type: 'group',
      fields: [
        {
          name: 'vatRate',
          label: 'Stopa PDV-a (%)',
          type: 'number',
          defaultValue: 20,
          required: true,
        },
        {
          name: 'currency',
          label: 'Valuta',
          type: 'select',
          defaultValue: 'RSD',
          options: [
            { label: 'RSD (dinar)', value: 'RSD' },
            { label: 'EUR (euro)', value: 'EUR' },
          ],
        },
        {
          name: 'showPricesWithVat',
          label: 'Prikazivati cene sa PDV-om kao primarnu',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'social',
      label: 'Društvene mreže',
      type: 'group',
      fields: [
        { name: 'facebook', label: 'Facebook URL', type: 'text' },
        { name: 'instagram', label: 'Instagram URL', type: 'text' },
        { name: 'linkedin', label: 'LinkedIn URL', type: 'text' },
        { name: 'youtube', label: 'YouTube URL', type: 'text' },
      ],
    },
    {
      name: 'seo',
      label: 'SEO',
      type: 'group',
      fields: [
        {
          name: 'metaDescription',
          label: 'Podrazumevani meta opis',
          type: 'textarea',
          admin: { description: 'Koristi se kada stranica nema sopstveni opis' },
        },
        {
          name: 'ogImage',
          label: 'Podrazumevana OG slika',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'notifications',
      label: 'Notifikacije',
      type: 'group',
      fields: [
        {
          name: 'orderNotificationEmail',
          label: 'Email za obaveštenja o narudžbinama',
          type: 'email',
        },
        {
          name: 'sendOrderConfirmation',
          label: 'Slati potvrdu narudžbine kupcu',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'lowStockThreshold',
          label: 'Upozorenje za nisku zalihu (kom)',
          type: 'number',
          defaultValue: 5,
        },
      ],
    },
  ],
}
