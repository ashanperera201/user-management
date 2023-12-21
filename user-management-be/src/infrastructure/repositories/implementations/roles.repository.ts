import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel, } from '@nestjs/mongoose';

import { RoleEntity, IRoleDocument } from '../..';
import { IRoleContractRepository } from '../contracts/role-contract.repository';

@Injectable()
export class RolesRepository implements IRoleContractRepository {

    constructor(@InjectModel('roles') private rolesModel: Model<IRoleDocument>) { }

    saveRolesAsync = async (role: RoleEntity): Promise<RoleEntity> => {
        var session = await this.rolesModel.startSession();
        try {
            await session.startTransaction();
            var savedResult = await this.rolesModel.create(role);
            await session.commitTransaction();
            return savedResult;
        } catch (error) {
            await session.abortTransaction();
        }
    }

    updateRolesAsync = async (role: RoleEntity): Promise<any> => {
        const session = await this.rolesModel.startSession();
        try {
            await session.startTransaction();
            const updatedResult = await this.rolesModel.updateOne(
                { _id: role._id },
                {
                    $set: { ...role },
                },
                { upsert: true }
            );
            await session.commitTransaction();
            return updatedResult;
        } catch (error) {
            await session.abortTransaction();
        }
    }

    deleteRolesAsync = async (roleIds: string[]): Promise<boolean> => {
        let query = null;
        if (roleIds.length === 0) {
            query = { _id: roleIds[0] };
        } else {
            const queryList = [];
            roleIds.forEach((e) => {
                queryList.push({ _id: e });
            });
            query = { $or: queryList };
        }

        const deletedRes = await this.rolesModel.deleteMany(query);
        if (deletedRes) {
            return true;
        } else {
            return false;
        }
    }

    getAllRolesAsync = async (): Promise<RoleEntity[]> => {
        return await this.rolesModel.find({ isActive: true }).populate('permissions').sort({ createdDate: 'descending' });
    }

    getRoleAsync = async (roleId: string): Promise<RoleEntity> => {
        return await this.rolesModel.findOne({ _id: roleId }).populate('permissions');
    }
}
