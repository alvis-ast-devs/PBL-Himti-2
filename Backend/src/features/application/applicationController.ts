import type { Request, Response } from 'express';
import { applicationService } from './applicationService.js';
import { prisma } from '../../config/prisma.js';

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

// Fungsi untuk mengambil semua komentar di satu tiket
export const getComments = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      const comments = await prisma.comment.findMany({
         where: { application_id: Number(id) },
         include: { user: true }, // Mengambil data user sekalian agar tahu siapa pengirimnya
         orderBy: { created_at: 'asc' } // Urutkan dari yang terlama ke terbaru
      });
      if (!comments){
         throw new Error('Comment tidak ditemukan')
      }
      res.json({ success: true, data: comments });

      
   } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Gagal mengambil data komentar" });
   }
};

// Fungsi untuk mengirim komentar baru
export const addComment = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      const { user_id, message } = req.body;
      
      const newComment = await prisma.comment.create({
         data: {
         application_id: Number(id),
         user_id: Number(user_id),
         message: message
         },
         include: { user: true, application: true }
      });
      
      res.status(201).json({ success: true, data: newComment });
   } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Gagal mengirim komentar" });
   }
};

export const applicationController = new ApplicationController();