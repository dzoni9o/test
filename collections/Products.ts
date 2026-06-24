import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Proizvod', plural: 'Proizvodi' },
  admin: {
    useAsTitle: 'name',
    group: 'Katalog',
    defaultColumns: ['name', 'sku', 'price', 'stock', 'category', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      label: 'Naziv proizvoda',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug (URL)',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'sku',
      label: 'Šifra artikla (SKU)',
      type: 'text',
      unique: true,
    },
    {
      name: 'barcode',
      label: 'Bar kod / EAN',
      type: 'text',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Osnovno',
          fields: [
            {
              name: 'shortDescription',
              label: 'Kratki opis',
              type: 'textarea',
            },
            {
              name: 'description',
              label: 'Detaljni opis',
              type: 'richText',
            },
            {
              name: 'images',
              label: 'Slike',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  label: 'Slika',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'isMain',
                  label: 'Glavna slika',
                  type: 'checkbox',
                  defaultValue: false,
                },
              ],
            },
          ],
        },
        {
          label: 'Cena i zalihe',
          fields: [
            {
              name: 'price',
              label: 'Cena (RSD bez PDV)',
              type: 'number',
              required: true,
              min: 0,
            },
            {
              name: 'priceWithVat',
              label: 'Cena sa PDV (20%)',
              type: 'number',
              admin: {
                readOnly: true,
                description: 'Automatski se računa',
              },
            },
            {
              name: 'comparePrice',
              label: 'Prečrtana cena (stara)',
              type: 'number',
              min: 0,
            },
            {
              name: 'b2bPrice',
              label: 'Veleprodajna cena (B2B)',
              type: 'number',
              min: 0,
            },
            {
              name: 'stock',
              label: 'Zaliha (kom)',
              type: 'number',
              defaultValue: 0,
              min: 0,
            },
            {
              name: 'stockStatus',
              label: 'Status zalihe',
              type: 'select',
              defaultValue: 'in_stock',
              options: [
                { label: 'Na stanju', value: 'in_stock' },
                { label: 'Nema na stanju', value: 'out_of_stock' },
                { label: 'Na upit', value: 'on_request' },
                { label: 'Prednarudžbina', value: 'preorder' },
              ],
            },
            {
              name: 'unit',
              label: 'Jedinica mere',
              type: 'select',
              defaultValue: 'kom',
              options: [
                { label: 'Komad (kom)', value: 'kom' },
                { label: 'Metar (m)', value: 'm' },
                { label: 'Kilogram (kg)', value: 'kg' },
                { label: 'Paket (pak)', value: 'pak' },
                { label: 'Kutija', value: 'kutija' },
              ],
            },
            {
              name: 'minOrderQty',
              label: 'Minimalna narudžbina',
              type: 'number',
              defaultValue: 1,
              min: 1,
            },
          ],
        },
        {
          label: 'Kategorija i brend',
          fields: [
            {
              name: 'category',
              label: 'Kategorija',
              type: 'relationship',
              relationTo: 'categories',
              required: true,
            },
            {
              name: 'brand',
              label: 'Brend / Proizvođač',
              type: 'relationship',
              relationTo: 'brands',
            },
            {
              name: 'tags',
              label: 'Tagovi',
              type: 'array',
              fields: [
                { name: 'tag', label: 'Tag', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Tehničke specifikacije',
          fields: [
            {
              name: 'specs',
              label: 'Specifikacije',
              type: 'array',
              fields: [
                { name: 'key', label: 'Osobina', type: 'text' },
                { name: 'value', label: 'Vrednost', type: 'text' },
                { name: 'unit', label: 'Jedinica', type: 'text' },
              ],
            },
            {
              name: 'datasheet',
              label: 'Tehnički list (PDF)',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              label: 'Meta naslov',
              type: 'text',
            },
            {
              name: 'metaDescription',
              label: 'Meta opis',
              type: 'textarea',
            },
          ],
        },
      ],
    },
    {
      name: 'featured',
      label: 'Istaknut proizvod',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'isNew',
      label: 'Označi kao NOVO',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'onSale',
      label: 'Akcija / Popust',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Aktivan', value: 'active' },
        { label: 'Arhiviran', value: 'archived' },
        { label: 'Draft', value: 'draft' },
      ],
    },
  ],
}
