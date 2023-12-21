export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
}

export type RegisterParams = {
  userName: string;
  firstName: string;
  lastName?: string;
  middleName?: string;
  password: string;
  email: string;
  secondaryEmail?: string;
  profile?: string;
  address?: string;
  contactNumber?: string;
  countryCode?: string;
  roles?: string[];
  isActive?: boolean;
  createdDate?: Date;
}

export type UserDataType = {
  _id: string | number;
  userName: string;
  firstName: string;
  lastName?: string;
  middleName?: string;
  password: string;
  email: string;
  secondaryEmail?: string;
  profile?: string;
  address?: string;
  contactNumber?: string;
  countryCode?: string;
  roles?: string[];
  isActive?: boolean;
  createdDate?: Date;
}

export type PermissionDataType = {
  permissionCode: string;
  permissionName: string;
  description: string;
  isActive: boolean;
  createdBy: string;
}

export type RoleDataType = {
  roleCode: string;
  roleName: string;
  description: string;
  isActive: boolean;
  permissions: PermissionDataType[];
}

export type AuthValuesType = {
  loading: boolean
  setLoading: (value: boolean) => void
  logout: () => void
  isInitialized: boolean
  user: UserDataType | null
  setUser: (value: UserDataType | null) => void
  setIsInitialized: (value: boolean) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  register: (params: RegisterParams, errorCallback?: ErrCallbackType) => void
}
