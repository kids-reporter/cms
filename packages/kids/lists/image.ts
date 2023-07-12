import config from '../config'
import { list, graphql } from '@keystone-6/core'
import { image, text, relationship, virtual, timestamp } from '@keystone-6/core/fields'

const listConfigurations = list({
  db: {
    map: 'Image',
  },
  fields: {
    name: text({
      label: '標題',
      validation: { isRequired: true },
    }),
    imageFile: image({
      storage: 'images',
    }),
    createdAt: timestamp(),
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

          const rtn : Record<string, string> = {}
          const filename = item?.imageFile_id

          if (!filename) {
            return empty
          }

          const extension = item?.imageFile_extension
            ? '.' + item.imageFile_extension
            : ''

          const resizedTargets = ['tiny', 'small', 'medium', 'large']

          resizedTargets.forEach((target) => {
            rtn[
              target
            ] = `${config.googleCloudStorage.origin}/images/${filename}-${target}${extension}`
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
    listView: {
      initialColumns: ['name', 'imageFile'],
      initialSort: { field: 'updatedAt', direction: 'ASC' },
      pageSize: 50,
    },
  },

  access: {
    operation: () => true,
  },
})

export default listConfigurations
