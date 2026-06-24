import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
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

const isProd = process.env.NODE_ENV === 'production'
const dbUri = process.env.DATABASE_URI
const blobToken = process.env.BLOB_READ_WRITE_TOKEN

const db = isProd
  ? postgresAdapter({ pool: { connectionString: dbUri! } })
  : sqliteAdapter({ client: { url: dbUri || 'file:./elektroin.db' } })

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
  db,
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(blobToken),
      token: blobToken || '',
      collections: {
        media: true,
      },
    }),
  ],
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
