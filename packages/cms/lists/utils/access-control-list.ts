import envVars from '../../environment-variables'

type Session = {
  data: {
    name: string
    email: string
    role: string
    twoFactorAuthBypass: boolean
  }
}

export const RoleEnum = {
  Owner: 'owner',
  Admin: 'admin',
  Developer: 'developer',
  Editor: 'editor',
  Contributor: 'contributor',
  Preview: 'preview',
  FrontendHeadlessAccount: 'frontend_headless_account',
  PreviewHeadlessAccount: 'preview_headless_account',
  CronjobHeadlessAccount: 'cronjob_headless_account',
}

export const allowRoles = (roles: string[]) => {
  return ({ session }: { session: Session }) => {
    if (envVars.nodeEnv === 'test') {
      return true
    }

    if (!Array.isArray(roles)) {
      return false
    }
    return roles.indexOf(session?.data.role) > -1
  }
}

export const allowAllRoles = () => {
  // Preview is not included in the list because it should not have access to the CMS
  const roles = [
    RoleEnum.Owner,
    RoleEnum.Admin,
    RoleEnum.Developer,
    RoleEnum.Editor,
    RoleEnum.Contributor,
    RoleEnum.FrontendHeadlessAccount,
    RoleEnum.PreviewHeadlessAccount,
    RoleEnum.CronjobHeadlessAccount,
  ]
  return allowRoles(roles)
}

export const denyRoles = (roles: string[]) => {
  return ({ session }: { session: Session }) => {
    if (!Array.isArray(roles)) {
      return true
    }
    return roles.indexOf(session?.data.role) === -1
  }
}
