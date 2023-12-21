import {
    PermissionsRepository, RolesRepository, UserRepository,
} from './'


export const infrastructureDependencies = [
    {
        provide: 'PERMISSIONS_CONTRACT_REPOSITORY',
        useClass: PermissionsRepository
    },
    {
        provide: 'ROLES_CONTRACT_REPOSITORY',
        useClass: RolesRepository
    },
    {
        provide: 'USER_CONTRACT_REPOSITORY',
        useClass: UserRepository
    },
]