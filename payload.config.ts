import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { fileURLToPath } from 'url'
import path from 'path'

import { Products } from './collections/Products'
import { Categories } from './collections/Categories'
import { Orders } from './collections/Orders'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Brands } from './collections/Brands'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— ElektroIN Admin',
    },
  },
  collections: [Products, Categories, Brands, Orders, Users, Media],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'elektro-in-secret-key-2024',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./elektroin.db',
    },
  }),
  upload: {
    limits: {
      fileSize: 10000000,
    },
  },
  localization: {
    locales: ['sr'],
    defaultLocale: 'sr',
  },
})
