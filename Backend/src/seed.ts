import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Mulai menabur data (seeding)... 🌱');

  // Hapus data lama agar bersih (dimulai dari child ke parent untuk menghindari error relasi)
  await prisma.application.deleteMany();
  await prisma.organization.deleteMany();
  console.log('Data lama berhasil dihapus.');

  // 1. BUAT USER & ORGANISASI SEKALIGUS
  const dummyOrg = await prisma.organization.create({
    data: {
      organization_name: faker.company.name(),
      contact_person: faker.person.fullName(),
      phone: faker.phone.number(),
      instagram: '@' + faker.internet.username(),
      
      // Karena Organisasi butuh User, kita buat User dummy sekalian di sini
      user: {
        create: {
          // ⚠️ PENTING: Sesuaikan kolom di bawah ini dengan isi 'model User' milikmu!
          // Saya mengasumsikan model User-mu minimal punya email dan password/nama.
          // Jika nama kolomnya berbeda (misal: 'username'), silakan diganti.
          email: faker.internet.email(),
          password_hash : 'password_dummy_123',
          name: faker.person.firstName(), 
        }
      }
    }
  });

  console.log(`Berhasil membuat Organisasi: ${dummyOrg.organization_name}`);

  const totalData = 20;

  // 2. BUAT DATA PENGAJUAN TIKET
  for (let i = 0; i < totalData; i++) {
    await prisma.application.create({
      data: {
        event_name: `Pengajuan ${faker.company.catchPhrase()}`, 
        location: faker.location.city(), 
        description: faker.lorem.paragraph(), 
        date: faker.date.recent({ days: 30 }), 
        status: faker.helpers.arrayElement(['PENDING', 'APPROVED', 'REJECTED', 'REVISION']),
        
        // Hubungkan tiket ini ke organisasi yang baru saja kita buat
        organization: {
          connect: { id: dummyOrg.id }
        }
      },
    });
  }

  console.log(`✅ Berhasil membuat ${totalData} data dummy tiket! 🎉`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });