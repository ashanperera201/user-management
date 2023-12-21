import { ModelDefinition } from '@nestjs/mongoose';
import { PermissionSchema, UserSchema, RoleSchema } from './';

export const modelDefinitions: ModelDefinition[] = [
  { name: 'permissions', schema: PermissionSchema },
  { name: 'users', schema: UserSchema },
  { name: 'roles', schema: RoleSchema },
];
