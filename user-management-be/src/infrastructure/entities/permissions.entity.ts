import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Permission {
    @Prop({ required: true })
    permissionCode: string;
    @Prop({ required: true })
    permissionName: string;
    @Prop()
    description: string;
    @Prop({ required: true })
    isActive: boolean;
    @Prop({ required: true })
    createdBy: string;
    @Prop({ required: true })
    createdDate: Date;
    @Prop({ required: false })
    modifiedBy: string;
    @Prop({ required: false })
    modifiedOn: Date;
}


export const PermissionSchema = SchemaFactory.createForClass(Permission);

export interface IPermissionDocument extends Document {
    permissionCode: string;
    permissionName: string;
    description?: string;
    isActive: boolean;
    createdBy: string;
    createdDate: Date;
    modifiedBy?: string;
    modifiedOn?: Date;
}

export class PermissionEntity {
    _id: string;
    permissionCode: string;
    permissionName: string;
    description?: string;
    isActive: boolean;
    createdBy: string;
    createdDate: Date;
    modifiedBy?: string;
    modifiedOn?: Date;
}
