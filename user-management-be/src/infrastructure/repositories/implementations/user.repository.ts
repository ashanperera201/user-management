import { Injectable } from '@nestjs/common';
import { Model, Query, Types } from 'mongoose';
import { InjectModel, } from '@nestjs/mongoose';

import { UserEntity, IUserDocument } from '../..';
import { IUserContractRepository } from '../contracts/user-contract.repository';

@Injectable()
export class UserRepository implements IUserContractRepository {

    constructor(@InjectModel('users') private userModel: Model<IUserDocument>) { }

    getUserByEmailOrUserNameAsync = async (email: string, userName: string): Promise<UserEntity> => {
        const user = await this.userModel.findOne(
            {
                $or: [
                    { email: email },
                    { userName: userName }
                ]
            }
        ).select('-__v');
        return user;
    }

    getUserQuery = (): Query<(IUserDocument & { _id: Types.ObjectId; })[], IUserDocument & { _id: Types.ObjectId; }, {}, IUserDocument> => {
        return this.userModel.find();
    }

    saveUserAsync = async (user: UserEntity): Promise<UserEntity> => {
        const session = await this.userModel.startSession();
        try {
            await session.startTransaction();
            const savedUser = await this.userModel.create(user)
            await session.commitTransaction();
            return savedUser;
        } catch (error) {
            await session.abortTransaction();
        }
    }

    updateUserAsync = async (user: UserEntity, changePassword?: boolean): Promise<any> => {
        const session = await this.userModel.startSession();
        try {
            await session.startTransaction();

            if (!changePassword) {
                const existsUser = await this.getUserAsync(user._id);

                user.password = existsUser.password;
                user.passwordSalt = existsUser.passwordSalt;
            }

            const updatedResult = await this.userModel.updateOne(
                { _id: user._id },
                {
                    $set: { ...user },
                },
                { upsert: true }
            );
            await session.commitTransaction();
            return updatedResult;
        } catch (error) {
            await session.abortTransaction();
        }
    }

    deleteUserAsync = async (userIds: string[]): Promise<boolean> => {
        let query = null;
        if (userIds.length === 0) {
            query = { _id: userIds[0] };
        } else {
            const queryList = [];
            userIds.forEach((e) => {
                queryList.push({ _id: e });
            });
            query = { $or: queryList };
        }

        const deletedRes = await this.userModel.deleteMany(query);
        if (deletedRes) {
            return true;
        } else {
            return false;
        }
    }

    getAllUsersAsync = async (searchTerm: string, page: number, pageSize: number = 10): Promise<{ count: number, data: UserEntity[] }> => {

        const skip = (page - 1) * pageSize;

        const count = await this.userModel.countDocuments();
        let query = this.userModel.find();

        if (searchTerm) {
            query = query.or([
                { userName: new RegExp(searchTerm, 'i') },
                { email: new RegExp(searchTerm, 'i') },
                { firstName: new RegExp(searchTerm, 'i') },
                { lastName: new RegExp(searchTerm, 'i') },
            ])
        }

        try {
            const data = await query
                .sort({ createdDate: 'descending' })
                .populate({ path: 'assignedDomainsId', model: 'domains', select: '-__v', match: { isActive: true }, populate: { path: 'bucket', match: { isActive: true }, select: '-__v', model: 'buckets' } })
                .populate({ path: 'roles', model: 'roles', select: '-__v', match: { isActive: true }, populate: { path: 'permissions', match: { isActive: true }, select: '-__v', model: 'permissions' } })
                .skip(skip)
                .limit(pageSize)
                .exec();

            return {
                count: count,
                data: data
            }
        } catch (error) {
            throw error
        }
    }

    getUserByEmailAsync = async (email: string): Promise<UserEntity> => {
        const user = await this.userModel.findOne({ email: email });
        return user;
    }

    getUserAsync = async (userId: any): Promise<UserEntity> => {
        return await this.userModel.findOne({ _id: userId })
            .populate({ path: 'assignedDomainsId', model: 'domains', select: '-__v', match: { isActive: true }, populate: { path: 'bucket', match: { isActive: true }, select: '-__v', model: 'buckets' } })
            .populate({ path: 'roles', model: 'roles', select: '-__v', match: { isActive: true }, populate: { path: 'permissions', match: { isActive: true }, select: '-__v', model: 'permissions' } })
            .sort({ createdDate: 'descending' });
    }
}
