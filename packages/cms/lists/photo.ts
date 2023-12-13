import config from '../config'
import { list, graphql } from '@keystone-6/core'
import {
  image,
  text,
  virtual,
  timestamp,
  relationship,
} from '@keystone-6/core/fields'
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
    }),
    imageFile: image({
      storage: 'images',
    }),
    authors: relationship({
      label: '作者',
      ref: 'Author',
      many: true,
    }),
    createdAt: timestamp({
      defaultValue: { kind: 'now' },
    }),
    updatedAt: timestamp({
      db: {
        updatedAt: true,
      },
    }),
    resized: virtual({
      field: graphql.field({
        type: graphql.object<{
          original: string
          tiny: string
          small: string
          medium: string
          large: string
        }>()({
          name: 'ResizedImages',
          fields: {
            original: graphql.field({ type: graphql.String }),
            tiny: graphql.field({ type: graphql.String }),
            small: graphql.field({ type: graphql.String }),
            medium: graphql.field({ type: graphql.String }),
            large: graphql.field({ type: graphql.String }),
          },
        }),
        resolve(item: Record<string, unknown>) {
          const empty = {
            original: '',
            tiny: '',
            small: '',
            medium: '',
            large: '',
          }

          // For backward compatibility,
          // this image item is uploaded via `GCSFile` custom field.
          if (item?.urlOriginal) {
            return Object.assign(empty, {
              original: item.urlOriginal,
            })
          }

          const rtn: Record<string, string> = {}
          const filename = item?.imageFile_id

          if (!filename) {
            return empty
          }

          const extension = item?.imageFile_extension
            ? '.' + item.imageFile_extension
            : ''

          const resizedTargets = {
            tiny: 400,
            small: 800,
            medium: 1200,
            large: 2000,
          }

          Object.entries(resizedTargets).forEach(([key, value]) => {
            rtn[
              key
            ] = `${config.googleCloudStorage.origin}/resized/${filename}-${value}.webp`
          })

          rtn[
            'original'
          ] = `${config.googleCloudStorage.origin}/images/${filename}${extension}`
          return Object.assign(empty, rtn)
        },
      }),
      ui: {
        query: '{ original tiny small medium large }',
      },
    }),
  },
  ui: {
    label: 'Photos（照片）',
    listView: {
      initialColumns: ['name'],
      initialSort: { field: 'updatedAt', direction: 'ASC' },
      pageSize: 50,
    },
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
})

export default listConfigurations
