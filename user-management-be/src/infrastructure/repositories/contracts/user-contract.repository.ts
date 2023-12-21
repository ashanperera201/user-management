import { Query, Types } from "mongoose";
import { IUserDocument, UserEntity } from "../../";

export interface IUserContractRepository {
    saveUserAsync(user: UserEntity): Promise<UserEntity>;
    updateUserAsync(user: UserEntity, changePassword?: boolean): Promise<any>;
    deleteUserAsync(userIds: string[]): Promise<boolean>;
    getAllUsersAsync(searchTerm: string, page: number, pageSize: number): Promise<{ count: number, data: UserEntity[] }>;
    getUserAsync(userId): Promise<UserEntity>;
    getUserByEmailAsync(email: string): Promise<UserEntity>;
    getUserByEmailOrUserNameAsync(email: string, userName: string): Promise<UserEntity>;
    getUserQuery(): Query<(IUserDocument & { _id: Types.ObjectId; })[], IUserDocument & { _id: Types.ObjectId; }, {}, IUserDocument>;
}
