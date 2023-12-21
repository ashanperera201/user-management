import { createSelector } from 'reselect';
import { IApplicationState } from '../../../@core/interfaces/application-state.interface';

const initialRoleSelector = (state: IApplicationState) => state.roleInfo;

export const selectRoleList = createSelector([initialRoleSelector], (role) => role?.roleList);