import type { CollectionConfig } from 'payload'

export const Brands: CollectionConfig = {
  slug: 'brands',
  labels: { singular: 'Brend', plural: 'Brendovi' },
  admin: {
    useAsTitle: 'name',
    group: 'Katalog',
  },
  fields: [
    {
      name: 'name',
      label: 'Naziv brenda',
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
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      label: 'Opis',
      type: 'textarea',
    },
    {
      name: 'website',
      label: 'Web sajt',
      type: 'text',
    },
    {
      name: 'featured',
      label: 'Istaknut na homepageu',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
