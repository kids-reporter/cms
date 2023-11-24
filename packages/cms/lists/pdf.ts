import config from '../config'
import { graphql, list } from '@keystone-6/core'
import { timestamp, text, file, virtual } from '@keystone-6/core/fields'
import {
  allowAllRoles,
  allowRoles,
  RoleEnum,
} from './utils/access-control-list'

const listConfigurations = list({
  fields: {
    name: text({
      label: '標題',
      validation: { isRequired: true },
      isIndexed: true,
    }),
    file: file({
      label: '上傳 PDF 檔案',
      storage: 'files',
    }),
    googleDrivePreviewLink: text({
      label: 'Google Drive Preview Link',
    }),
    description: text({
      label: '檔案說明',
    }),
    embeddedCode: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve(item: Record<string, unknown>) {
          const filename = item?.file_filename
          if (typeof filename !== 'string' || filename === '') {
            return ''
          }
          const downloadLink = `${config.googleCloudStorage.origin}/files/${filename}`
          const title = item.name
          let code = item.googleDrivePreviewLink
            ? `<iframe src="${item.googleDrivePreviewLink}" width="100%" height="480" allow="autoplay" style="margin-bottom: 27px;"></iframe>`
            : ``

          code =
            code +
            `
          <div style="display: flex; align-items: center; justify-content: center; gap:11px;">
            <span style="font-size: 16px; color: #27B5F7;">▶ ${title}</span>
            <a href=${downloadLink} download style="text-decoration: none;">
              <div style="color: white; background-color:#27B5F7; padding: 5px 20px; line-height: 30px; font-size: 15px; border-radius: 3px;">下載</div>
            </a>
          </div>
          `
          return code
        },
      }),
      ui: {
        views: './lists/views/embedded-code',
      },
    }),
    createdAt: timestamp({
      defaultValue: { kind: 'now' },
    }),
    updatedAt: timestamp({
      db: {
        updatedAt: true,
      },
    }),
  },

  access: {
    operation: {
      query: allowAllRoles(),
      create: allowRoles([
        RoleEnum.Owner,
        RoleEnum.Admin,
        RoleEnum.Editor,
        RoleEnum.Contributor,
      ]),
      update: allowRoles([RoleEnum.Owner, RoleEnum.Admin, RoleEnum.Editor]),
      delete: allowRoles([RoleEnum.Owner, RoleEnum.Admin, RoleEnum.Editor]),
    },
  },
  ui: {
    label: 'PDF',
    singular: 'PDF',
    plural: 'PDFs',
    listView: {
      initialColumns: ['name', 'description'],
      initialSort: { field: 'updatedAt', direction: 'ASC' },
      pageSize: 50,
    },
    path: 'pdf',
  },

  hooks: {},
})

export default listConfigurations
