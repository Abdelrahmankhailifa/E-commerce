// auth/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../entities/user-role.enum';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
