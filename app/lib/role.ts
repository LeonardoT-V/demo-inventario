export const ROLES = {
  PUBLIC: 'public',
  AUTHENTICATED: 'authenticated',
  ADMIN: 'admin',
  SUPERVISOR: 'supervisor'
}

export const ROLES_OPERATION = {
  CREATE: [ROLES.ADMIN, ROLES.SUPERVISOR],
  EDIT: [ROLES.ADMIN, ROLES.SUPERVISOR],
  DELETE: [ROLES.ADMIN, ROLES.SUPERVISOR],
  READ: [ROLES.PUBLIC, ROLES.AUTHENTICATED, ROLES.PUBLIC, ROLES.SUPERVISOR]
}

type OperationUser = keyof typeof ROLES_OPERATION
export const rolesSelection = (role, operation: OperationUser) => {
  if (!ROLES_OPERATION[operation].includes(role)) {
    return false
  }
  return true
}