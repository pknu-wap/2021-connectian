import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from './role.enum';

export const Roles = (...args: RoleEnum[]) => SetMetadata('roles', args);
