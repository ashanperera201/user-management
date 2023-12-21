import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel, } from '@nestjs/mongoose';

import { IPermissionsContractRepository, IPermissionDocument, PermissionEntity } from '../..';

@Injectable()
export class PermissionsRepository implements IPermissionsContractRepository {


    constructor(@InjectModel('permissions') private permissionsModel: Model<IPermissionDocument>,) { }

    getPermissionByNameAsync = async (permissionName: string): Promise<PermissionEntity> => {
        return await this.permissionsModel.findOne({ permissionName: permissionName });
    }

    savePermissionsAsync = async (permission: PermissionEntity): Promise<PermissionEntity> => {
        const session = await this.permissionsModel.startSession();
        try {
            await session.startTransaction();
            const savedResult = await this.permissionsModel.create(permission);
            await session.commitTransaction();
            return savedResult;
        } catch (error) {
            await session.abortTransaction();
        }
    }

    updatePermissionsAsync = async (permission: PermissionEntity): Promise<any> => {
        const session = await this.permissionsModel.startSession();

        try {
            await session.startTransaction();
            const updatedResult = await this.permissionsModel.updateOne(
                { _id: permission._id },
                {
                    $set: { ...permission },
                },
                { upsert: true }
            );
            await session.commitTransaction();
            return updatedResult;
        } catch (error) {
            await session.abortTransaction();
        }
    }

    deletePermissionsAsync = async (permissionIds: string[]): Promise<boolean> => {
        let query = null;
        if (permissionIds.length === 0) {
            query = { _id: permissionIds[0] };
        } else {
            const queryList = [];
            permissionIds.forEach((e) => {
                queryList.push({ _id: e });
            });
            query = { $or: queryList };
        }

        const deletedRes = await this.permissionsModel.deleteMany(query);
        if (deletedRes) {
            return true;
        } else {
            return false;
        }
    }

    getAllPermissionsAsync = async (): Promise<PermissionEntity[]> => {
        return await this.permissionsModel.find({ isActive: true }).sort({ createdDate: 'descending' });
    }

    getPermissionsAsync = async (permissionId: string): Promise<PermissionEntity> => {
        return await this.permissionsModel.findOne({ _id: permissionId });
    }
}
