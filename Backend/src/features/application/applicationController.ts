import type { Request, Response } from 'express';
import { applicationService } from './applicationService.js';

class ApplicationController {
   async getAll(req: Request, res: Response) {
      try {
         const data = await applicationService.getAllApplications();
         res.status(200).json({ success: true, data });
      } catch (error: any) {
         res.status(500).json({ success: false, message: error.message });
      }
   }

   async getById(req: Request, res: Response) {
      try {
         const id = parseInt(req.params.id as string, 10); 
         const data = await applicationService.getApplicationById(id);
         
         res.status(200).json({ success: true, data });
      } catch (error: any) {
         res.status(404).json({ success: false, message: error.message });
      }
   }

   async create(req: Request, res: Response) {
      try {
         const data = await applicationService.createApplication(req.body);
         
         res.status(201).json({ success: true, data });
      } catch (error: any) {
         res.status(400).json({ success: false, message: 'Gagal membuat pengajuan: ' + error.message });
      }
   }

   async update(req: Request, res: Response) {
      try {
         const id = parseInt(req.params.id as string, 10);
         const data = await applicationService.updateApplication(id, req.body);
         
         res.status(200).json({ success: true, data });
      } catch (error: any) {
         res.status(400).json({ success: false, message: error.message });
      }
   }

   async delete(req: Request, res: Response) {
      try {
         const id = parseInt(req.params.id as string, 10);
         await applicationService.deleteApplication(id);
         
         res.status(200).json({ success: true, message: 'Data berhasil dihapus' });
      } catch (error: any) {
         res.status(400).json({ success: false, message: error.message });
      }
   }
}

export const applicationController = new ApplicationController();