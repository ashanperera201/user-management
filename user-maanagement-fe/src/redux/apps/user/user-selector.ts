import { createSelector } from 'reselect';
import { IApplicationState } from '../../../@core/interfaces/application-state.interface';

const initialUserSelector = (state: IApplicationState) => state.userInfo;

export const selectUserList = createSelector([initialUserSelector], (user) => user.userList);