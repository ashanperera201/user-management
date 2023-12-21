import { RoleDataType } from 'src/context/types'
import { getUserAsync } from './user.service'

export const getAutharizationAsync = async (userId: string = '6371f66301d9d94e5f4dbbf2', roleCodes: string[]): Promise<RoleDataType[]> => {
    return getUserAsync(userId)
    .then(response => {
        let roles : RoleDataType[] = response.data.data.roles
        const authArray = roles.filter(role => {
          return roleCodes.includes(role.roleCode)
        })
        return authArray
      }
    )
}
