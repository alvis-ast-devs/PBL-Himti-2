import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient(); // Inisialisasi Prisma

app.use(cors());
app.use(express.json());

// Endpoint Utama
app.get('/', (req: Request, res: Response) => {
  res.send('Server PartnerHub Backend (TypeScript + Prisma) Berjalan Mulus!');
});

// Endpoint untuk mengambil seluruh daftar aplikasi/pengajuan
app.get('/api/applications', async (req: Request, res: Response) => {
  try {
    const applications = await prisma.application.findMany({
      include: {
        organization: true, // Mengambil data organisasi sekaligus
      }
    });

    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error('Error Database:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil data pengajuan' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Backend menyala di http://localhost:${PORT}`);
});