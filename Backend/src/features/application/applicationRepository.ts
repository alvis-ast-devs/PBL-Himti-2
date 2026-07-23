import type { Application, Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma.js';
import type { ApplicationWithOrganization } from './applicationTypes.js';

class ApplicationRepository {
    async getAllApplications(): Promise<ApplicationWithOrganization[]> {
        return prisma.application.findMany({
            include: { organization: true },
            orderBy: { id: 'asc' },
        });
    }

    async findById(id: number): Promise<ApplicationWithOrganization | null> {
        return await prisma.application.findUnique({
            where: { id },
            include: { organization: true },
        });
    }

    async create(data: Prisma.ApplicationCreateInput): Promise<ApplicationWithOrganization>{
        return await prisma.application.create({
            data,
            include: { organization: true },
        });
    }

    async update(id: number, data: Prisma.ApplicationUpdateInput): Promise<ApplicationWithOrganization> {
        return await prisma.application.update({
            where: { id },
            data,
            include: { organization: true },
        });
    }

    async delete(id: number): Promise<Application> {
        return await prisma.application.delete({
            where: {id},
        });
    }

}


export const applicationRepository = new ApplicationRepository();