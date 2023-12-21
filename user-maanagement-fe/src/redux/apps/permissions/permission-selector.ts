import { createSelector } from 'reselect';
import { IApplicationState } from '../../../@core/interfaces/application-state.interface';

const initialPermissionSelector = (state: IApplicationState) => state.permissionInfo;

export const selectPermissionList = createSelector([initialPermissionSelector], (permission) => permission?.permissionList);