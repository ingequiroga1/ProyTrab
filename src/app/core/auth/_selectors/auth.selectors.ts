// NGRX
import {createFeatureSelector,createSelector} from '@ngrx/store';
// Lodash
import {each, find, some} from 'lodash';
// Selectors
import {selectAllRoles} from './role.selectors';
import {selectAllPermissions} from './permission.selectors';
// Models
import {Role} from '../_models/role.model';
import {Permission} from '../_models/permission.model';
import { Base } from '../_models/bases.model';

export const UserBases = createFeatureSelector<Base[]>('users');

export const selectAuthState = state => state.auth;

export const isLoggedIn = createSelector(selectAuthState, auth => auth.loggedIn);

export const isLoggedOut = createSelector(isLoggedIn, loggedIn => !loggedIn);

export const currentAuthToken = createSelector(selectAuthState, auth => auth.authToken);

export const isUserLoaded = createSelector(selectAuthState, auth => auth.isUserLoaded);

export const isBasesLoaded = createSelector(selectAuthState, auth => auth.isBasesLoaded);

export const currentUser = createSelector(selectAuthState, auth => auth.user);

export const currentUserBases = createSelector(selectAuthState, auth => auth.bases); // 07/10/20

export const currentBaseSelected = createSelector(selectAuthState, auth => auth.baseSelected); // 16/10/20

export const currentUserRoleIds = createSelector(
    currentUser,
    user => {
      if (!user) {
        return [];
      }

      return user.roles;
    }
);

export const currentUserPermissionsIds = createSelector(
    currentUserRoleIds,
    selectAllRoles,
    (userRoleIds: number[], allRoles: Role[]) => {
      return getPermissionsIdsFrom(userRoleIds, allRoles);
    }
);

export const checkHasUserPermission = (permissionId: number) => createSelector(
    currentUserPermissionsIds,
    (ids: number[]) => {
      return ids.some(id => id === permissionId);
    }
);

export const selectBaseById = (baseId: number) => createSelector(
  UserBases,
  basesState => basesState.entries[baseId]
);


export const currentUserPermissions = createSelector(
    currentUserPermissionsIds,
    selectAllPermissions,
    (permissionIds: number[], allPermissions: Permission[]) => {
      const result: Permission[] = [];
      each(permissionIds, id => {
        const userPermission = find(allPermissions, elem => elem.id === id);
        if (userPermission) {
          result.push(userPermission);
        }
      });
      return result;
    }
);

function getPermissionsIdsFrom(userRolesIds: number[] = [], allRoles: Role[] = []): number[] {
  const userRoles: Role[] = [];
  each(userRolesIds, (id: number) => {
    const userRole = find(allRoles, (role: Role) => role.id === id);
    if (userRole) {
      userRoles.push(userRole);
    }
  });

  const result: number[] = [];
  each(userRoles, (role: Role) => {
    each(role.permissions, id => {
      if (!some(result, gid => gid === id)) {
        result.push(id);
      }
    });
  });
  return result;
}
