
import { v4 as uuidv4 } from 'uuid';

import { UserDto } from "../../application/dto";
import { UserEntity } from "..";

export class UserExtension {

    static toEntity = (user: UserDto): UserEntity => {
        return {
            _id: user._id,
            userUniqueId: user._id ?? uuidv4(),
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            middleName: user.middleName,
            password: user.password,
            passwordSalt: user.passwordSalt,
            email: user.email,
            secondaryEmail: user.secondaryEmail,
            profile: user.profile,
            address: user.address,
            contactNumber: user.contactNumber,
            countryCode: user.countryCode,
            loginAttempts: user.loginAttempts,
            loginFailedAttempts: user.loginFailedAttempts,
            roles: user.roles,
            passportNumber: user.passportNumber,
            userType: user.userType,
            isActive: user.isActive,
            createdDate: user.createdDate,
            createdBy: user.createdBy,
            modifiedBy: user.modifiedBy,
            modifiedOn: user.modifiedOn,
        }
    }


    static toDto = (user: UserEntity, emptyPassword: boolean = false): UserDto => {
        return {
            _id: user._id,
            userUniqueId: user.userUniqueId,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            middleName: user.middleName,
            password: emptyPassword ? null : user.password,
            passwordSalt: emptyPassword ? null : user.passwordSalt,
            email: user.email,
            secondaryEmail: user.secondaryEmail,
            profile: user.profile,
            address: user.address,
            contactNumber: user.contactNumber,
            countryCode: user.countryCode,
            loginAttempts: user.loginAttempts,
            loginFailedAttempts: user.loginFailedAttempts,
            roles: user.roles,
            passportNumber: user.passportNumber,
            userType: user.userType,
            isActive: user.isActive,
            createdDate: user.createdDate,
            createdBy: user.createdBy,
            modifiedBy: user.modifiedBy,
            modifiedOn: user.modifiedOn,
        }
    }
}
