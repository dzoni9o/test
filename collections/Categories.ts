import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Kategorija', plural: 'Kategorije' },
  admin: {
    useAsTitle: 'name',
    group: 'Katalog',
  },
  fields: [
    {
      name: 'name',
      label: 'Naziv kategorije',
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
      name: 'parent',
      label: 'Roditeljska kategorija',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
    },
    {
      name: 'image',
      label: 'Slika kategorije',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'icon',
      label: 'Ikona (emoji ili naziv)',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Opis',
      type: 'textarea',
    },
    {
      name: 'order',
      label: 'Redosled prikaza',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'featured',
      label: 'Prikaži na homepageu',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
