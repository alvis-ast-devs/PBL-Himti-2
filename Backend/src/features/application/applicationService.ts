import type { Prisma, Application } from '@prisma/client';
import { applicationRepository } from './applicationRepository.js';
import type { ApplicationWithOrganization } from './applicationTypes.js';

class ApplicationService {
   async getAllApplications(): Promise<ApplicationWithOrganization[]> {
      return await applicationRepository.getAllApplications();
   }

   async getApplicationById(id: number): Promise<ApplicationWithOrganization> {
      const application = await applicationRepository.findById(id);
      
      if (!application) {
         throw new Error('Data pengajuan tidak ditemukan');
      }
      
      return application;
   }

   async createApplication(data: Prisma.ApplicationCreateInput): Promise<ApplicationWithOrganization> {
      return await applicationRepository.create(data);
   }

   async updateApplication(id: number, data: Prisma.ApplicationUpdateInput): Promise<ApplicationWithOrganization> {
      const application = await applicationRepository.findById(id);
      
      if (!application) {
         throw new Error('Data pengajuan tidak ditemukan dan gagal diperbarui');
      }

      const restrictedStatuses = ['ACCEPTED', 'APPROVED', 'DENIED', 'REJECTED'];
      if (restrictedStatuses.includes(application.status.toUpperCase())) {
         throw new Error('Pengajuan yang sudah diproses tidak dapat diubah lagi');
      }

      return await applicationRepository.update(id, data);
   }

   async deleteApplication(id: number): Promise<Application> {
      const application = await applicationRepository.findById(id);
      
      if (!application) {
         throw new Error('Data pengajuan tidak ditemukan dan gagal dihapus');
      }

      return await applicationRepository.delete(id);
   }
}

export const applicationService = new ApplicationService();

