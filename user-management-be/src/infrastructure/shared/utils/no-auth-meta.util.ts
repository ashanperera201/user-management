import { SetMetadata } from '@nestjs/common'

export const AllowAnonymous = () => SetMetadata('avoid-auth', true);
