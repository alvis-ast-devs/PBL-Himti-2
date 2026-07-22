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

// Middleware to ensure mock organization exists since no auth yet
const ensureMockOrg = async () => {
  let org = await prisma.organization.findFirst();
  if (!org) {
    const user = await prisma.user.create({
      data: {
        name: 'Mock User',
        email: 'mock@example.com',
        password_hash: 'hashed_password',
      }
    });
    org = await prisma.organization.create({
      data: {
        user_id: user.id,
        organization_name: 'Mock Org',
        contact_person: 'Mock Contact',
        phone: '1234567890',
      }
    });
  }
  return org.id;
};

// GET all applications
app.get('/api/applications', async (req: Request, res: Response) => {
  try {
    const applications = await prisma.application.findMany({
      include: { organization: true },
      orderBy: { id: 'desc' }
    });
    res.json({ success: true, data: applications });
  } catch (error) {
    console.error('Error Database:', error);
    res.status(500).json({ success: false, message: 'Gagal mengambil data pengajuan' });
  }
});

// GET single application
app.get('/api/applications/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const application = await prisma.application.findUnique({
      where: { id: parseInt(req.params.id as string) },
      include: { organization: true }
    });
    if (!application) {
      res.status(404).json({ success: false, message: 'Not found' });
      return;
    }
    res.json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching' });
  }
});

// POST create application (ticket)
app.post('/api/applications', async (req: Request, res: Response) => {
  try {
    const orgId = await ensureMockOrg();
    const { event_name, location, description, date } = req.body;
    
    const newApp = await prisma.application.create({
      data: {
        organization_id: orgId,
        event_name,
        location,
        description,
        date: date ? new Date(date) : new Date(),
        status: 'PENDING'
      }
    });
    res.json({ success: true, data: newApp });
  } catch (error) {
    console.error('Error Create:', error);
    res.status(500).json({ success: false, message: 'Error creating' });
  }
});

// PUT update application
app.put('/api/applications/:id', async (req: Request, res: Response) => {
  try {
    const { event_name, location, description } = req.body;
    const updated = await prisma.application.update({
      where: { id: parseInt(req.params.id as string) },
      data: { event_name, location, description }
    });
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error Update:', error);
    res.status(500).json({ success: false, message: 'Error updating' });
  }
});

// DELETE application
app.delete('/api/applications/:id', async (req: Request, res: Response) => {
  try {
    await prisma.application.delete({
      where: { id: parseInt(req.params.id as string) }
    });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error Delete:', error);
    res.status(500).json({ success: false, message: 'Error deleting' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server Backend menyala di http://localhost:${PORT}`);
});