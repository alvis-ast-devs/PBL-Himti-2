import type { Prisma } from '@prisma/client';

export type ApplicationWithOrganization = Prisma.ApplicationGetPayload<{
    include: {
        organization: true;
    };
}>;

