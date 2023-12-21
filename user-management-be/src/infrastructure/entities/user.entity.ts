import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';

import { RoleEntity } from "./roles.entity";

@Schema()
export class Users {
    @Prop({ required: true })
    userUniqueId: string;
    @Prop({ required: true })
    userName: string;
    @Prop({ required: true })
    firstName: string;
    @Prop({ required: false })
    lastName: string;
    @Prop({ required: false })
    middleName: string;
    @Prop({ required: true })
    password: string;
    @Prop({ required: true })
    passwordSalt: string;
    @Prop({ required: true })
    email: string;
    @Prop({ required: false })
    secondaryEmail: string;
    @Prop({ required: false })
    profile: string;
    @Prop({ required: false })
    address: string;
    @Prop({ required: false })
    contactNumber: string;
    @Prop({ required: false })
    countryCode: string;
    @Prop({ required: false })
    loginAttempts: number;
    @Prop({ required: false })
    loginFailedAttempts: number;
    @Prop({ required: false, type: [{ type: mongoose.Schema.Types.ObjectId }], ref: 'roles' })
    roles: string[];
    @Prop({ required: false })
    passportNumber: string;
    @Prop({ required: false })
    userType: string;
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

export const UserSchema = SchemaFactory.createForClass(Users);

export interface IUserDocument extends Document {
    userUniqueId: string;
    userName: string;
    firstName: string;
    lastName: string;
    middleName: string;
    password: string;
    passwordSalt: string;
    email: string;
    secondaryEmail: string;
    profile: string;
    address: string;
    contactNumber: string;
    countryCode: string;
    loginAttempts: number;
    loginFailedAttempts: number;
    roles: RoleEntity[];
    passportNumber: string;
    userType: string;
    isActive: boolean;
    createdDate: Date;
    createdBy: string;
    modifiedBy?: string;
    modifiedOn?: Date;
}

export class UserEntity {
    _id?: string;
    userUniqueId: string;
    userName: string;
    firstName: string;
    lastName: string;
    middleName: string;
    password: string;
    passwordSalt: string;
    email: string;
    secondaryEmail: string;
    profile: string;
    address: string;
    contactNumber: string;
    countryCode: string;
    loginAttempts: number;
    loginFailedAttempts: number;
    roles: RoleEntity[];
    passportNumber: string;
    userType: string;
    isActive: boolean;
    createdDate: Date;
    createdBy: string;
    modifiedBy?: string;
    modifiedOn?: Date;
}
