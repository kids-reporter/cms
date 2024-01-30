import { list, graphql } from '@keystone-6/core'
import {
  text,
  password,
  select,
  timestamp,
  virtual,
  checkbox,
} from '@keystone-6/core/fields'
import {
  allowAllRoles,
  allowRoles,
  RoleEnum,
} from './utils/access-control-list'

const listConfigurations = list({
  fields: {
    name: text({
      label: '姓名',
      validation: { isRequired: true },
    }),
    email: text({
      label: 'Email',
      validation: { isRequired: true },
      isIndexed: 'unique',
      isFilterable: true,
    }),
    password: password({
      label: '密碼',
      validation: { isRequired: true },
    }),
    role: select({
      label: '角色權限',
      type: 'string',
      options: [
        {
          label: RoleEnum.Owner,
          value: RoleEnum.Owner,
        },
        {
          label: RoleEnum.Admin,
          value: RoleEnum.Admin,
        },
        {
          label: RoleEnum.Developer,
          value: RoleEnum.Developer,
        },
        {
          label: RoleEnum.Editor,
          value: RoleEnum.Editor,
        },
        {
          label: RoleEnum.Contributor,
          value: RoleEnum.Contributor,
        },
        {
          label: RoleEnum.Preview,
          value: RoleEnum.Preview,
        },
        {
          label: RoleEnum.FrontendHeadlessAccount,
          value: RoleEnum.FrontendHeadlessAccount,
        },
        {
          label: RoleEnum.PreviewHeadlessAccount,
          value: RoleEnum.PreviewHeadlessAccount,
        },
        {
          label: RoleEnum.CronjobHeadlessAccount,
          value: RoleEnum.CronjobHeadlessAccount,
        },
      ],
      validation: { isRequired: true },
    }),
    createdAt: timestamp({
      defaultValue: { kind: 'now' },
    }),
    updatedAt: timestamp({
      db: {
        updatedAt: true,
      },
    }),
    twoFactorAuthBypass: checkbox({
      defaultValue: false,
      ui: {
        createView: { fieldMode: 'hidden' },
        listView: { fieldMode: 'read' },
        itemView: { fieldMode: 'read' },
      },
    }),
    twoFactorAuthSecret: text({
      db: {
        isNullable: true,
      },
      ui: {
        createView: { fieldMode: 'hidden' },
        listView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'hidden' },
      },
    }),
    twoFactorAuthTemp: text({
      db: {
        isNullable: true,
      },
      ui: {
        createView: { fieldMode: 'hidden' },
        listView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'hidden' },
      },
    }),
    twoFactorAuthSetup: virtual({
      field: graphql.field({
        type: graphql.JSON,
        resolve(): Record<string, string> {
          return {
            href: `/2fa-setup`,
            target: '_self',
            label: '設定二階段驗證',
            buttonLabel: 'Setup 2FA',
          }
        },
      }),
      ui: {
        views: './lists/views/link-button',
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldPosition: 'sidebar',
        },
        listView: {
          fieldMode: 'hidden',
        },
      },
    }),
  },
  ui: {
    listView: {
      initialColumns: ['name', 'role'],
    },
  },
  access: {
    operation: {
      query: allowAllRoles(),
      create: allowRoles([RoleEnum.Owner, RoleEnum.Admin]),
      update: allowAllRoles(),
      delete: allowRoles([RoleEnum.Owner, RoleEnum.Admin]),
    },
    item: {
      update: ({ session, inputData, item }) => {
        const userRole = session?.data?.role
        const userEmail = session?.data?.email

        // only owner and admin roles can update the items without further checking
        if ([RoleEnum.Owner, RoleEnum.Admin].indexOf(userRole) > -1) {
          return true
        }

        if (
          // session user updates her/his password
          item?.email === userEmail &&
          // `inputData` only contains `password` property
          Object.keys(inputData).length === 1 &&
          inputData?.password
        ) {
          return true
        }

        return false
      },
    },
  },
  hooks: {},
})

export default listConfigurations
