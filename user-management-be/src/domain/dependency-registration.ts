import {
    AppService, PermissionsService, RolesService, UserService, TokenService
} from "./services";

export const dependencies = [
    {
        provide: 'APP_CONTRACT_SERVICE',
        useClass: AppService
    },
    {
        provide: 'PERMISSION_CONTRACT_SERVICE',
        useClass: PermissionsService
    },
    {
        provide: 'ROLES_CONTRACT_SERVICE',
        useClass: RolesService
    },
    {
        provide: 'USER_CONTRACT_SERVICE',
        useClass: UserService
    },
    {
        provide: 'TOKEN_CONTRACT_SERVICE',
        useClass: TokenService
    },
]