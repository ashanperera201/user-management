import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';

import { PermissionEntity } from './permissions.entity'

@Schema()
export class Roles {
  @Prop({ required: true })
  roleCode: string;
  @Prop({ required: true })
  roleName: string;
  @Prop({ required: false, type: [{ type: mongoose.Schema.Types.ObjectId }], ref: 'permissions' })
  permissions?: string[];
  @Prop({ required: false })
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


export const RoleSchema = SchemaFactory.createForClass(Roles);

export interface IRoleDocument extends Document {
  roleCode: string;
  roleName: string;
  permissions?: PermissionEntity[];
  description?: string;
  isActive: boolean;
  createdBy: string;
  createdDate: Date;
  modifiedBy?: string;
  modifiedOn?: Date;
}

export class RoleEntity {
  _id: string;
  roleCode: string;
  roleName: string;
  permissions?: PermissionEntity[];
  description?: string;
  isActive: boolean;
  createdBy: string;
  createdDate: Date;
  modifiedBy?: string;
  modifiedOn?: Date;
}
