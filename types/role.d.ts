

export interface Role {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  rolePermissions: RolePermission[];
}

export interface RolePermission {
  roleId: string;
  permissionId: string;
  createAction: boolean;
  readAction: boolean;
  updateAction: boolean;
  deleteAction: boolean;
  permission: Permission;
}

export interface Permission {
  id: string;
  resource: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
