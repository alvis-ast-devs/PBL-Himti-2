# AGENTS.md

Dokumen ini berlaku untuk semua coding agent yang bekerja di repository HIMTI PartnerHub.

## 1. Pemeriksaan identitas wajib

Sebelum melakukan operasi yang membuat, mengubah, memindahkan, atau menghapus file, agent **wajib bertanya persis**:

> Siapa nama kamu?

Agent harus menunggu jawaban. Nama yang valid hanya:

- Adin
- Cecil
- Olssen
- Alvis

Aturan tambahan:

- Jangan menebak identitas dari nama akun Git, nama branch, email, atau percakapan lama.
- Pertanyaan cukup dilakukan satu kali dalam satu sesi kerja, selama identitasnya tetap jelas.
- Agent boleh membaca dan menjelaskan kode sebelum identitas dijawab, tetapi tidak boleh mengubah file.
- Jika jawaban bukan salah satu dari empat nama tersebut, jangan mengubah file. Minta nama yang valid.

## 2. Baca dokumen sebelum coding

Setelah identitas diketahui, baca minimal:

1. `docs/prd.md` - Product Requirements Document
2. `docs/feature_ownership.md` - Kepemilikan fitur dan batas file
3. `docs/repo_structure.md` - Struktur folder dan teknologi
4. `docs/github_workflow.md` - Alur kerja Git dan PR
5. Dokumen teknis yang berhubungan dengan tugas

Jangan mulai coding hanya dari satu prompt jika prompt tersebut bertentangan dengan dokumen repository.

## 3. Prinsip kepemilikan fitur

Setiap orang memiliki satu bagian produk secara vertikal. Artinya, pemilik fitur dapat mengerjakan frontend dan backend di dalam batas fiturnya.

### Adin — Landing Page

Boleh mengubah:

- `Frontend/app/page.tsx`
- `Frontend/components/landing/**`
- `Frontend/public/landing/**`
- `Frontend/lib/api/public.ts`, hanya jika landing memakai endpoint publik
- `Backend/features/public/**`, hanya jika endpoint publik benar-benar dibutuhkan

Tidak boleh mengubah halaman auth, partner, atau admin.

### Cecil — Authentication

Boleh mengubah:

- `Frontend/app/login/**`
- `Frontend/app/register/**`
- `Frontend/components/auth/**`
- `Frontend/lib/api/auth.ts`
- `Frontend/lib/auth/**`
- `Backend/features/auth/**`
- `Backend/middleware/authenticate.ts`
- `Backend/middleware/authorize.ts`
- `Backend/prisma/schema.prisma` (model User, Organization saja)
- `Backend/prisma/seed.ts` (untuk admin seed)

Cecil memiliki proses register, login, logout, membaca user aktif, proteksi route, dan seed akun admin.

### Olssen — Partner Features

Boleh mengubah:

- `Frontend/app/partner/**`
- `Frontend/components/partner/**`
- `Frontend/lib/api/partner.ts`
- `Backend/features/partner-applications/**`
- `Backend/features/partner-deliverables/**`
- `Backend/prisma/schema.prisma` (model Application saja, setelah koordinasi dengan Cecil)

Olssen memiliki dashboard partner, daftar pengajuan, pembuatan pengajuan, detail, revisi, dan bukti kewajiban partner.

### Alvis — Admin Features

Boleh mengubah:

- `Frontend/app/admin/**`
- `Frontend/components/admin/**`
- `Frontend/lib/api/admin.ts`
- `Backend/features/admin-review/**`
- `Backend/features/admin-deliverables/**`
- `Backend/prisma/schema.prisma` (model Deliverable, StatusHistory saja, setelah koordinasi)

Alvis memiliki dashboard admin, daftar seluruh pengajuan, review, perubahan status, checklist kewajiban, bukti HIMTI, dan penutupan kerja sama.

## 4. File bersama yang dilindungi

File berikut tidak boleh diubah sepihak:

- `AGENTS.md`
- `README.md`
- seluruh isi `docs/**`
- `.gitignore`
- `.env.example`
- file `package.json` dan lock file
- konfigurasi Next.js, Tailwind, ESLint, dan PostCSS
- `Frontend/app/layout.tsx`
- `Frontend/app/globals.css`
- `Frontend/components/shared/**`
- `Backend/index.ts` (main server file)
- `Backend/prisma/schema.prisma` (perlu koordinasi untuk perubahan model bersama)
- route handler atau middleware milik orang lain

Sebelum mengubah file bersama, agent harus:

1. Menjelaskan file yang ingin diubah.
2. Menjelaskan alasan perubahan.
3. Menyebutkan fitur lain yang mungkin terkena dampak.
4. Meminta izin eksplisit dari user.
5. Hanya mengubah bagian minimum yang diperlukan.

## 5. Larangan penting

Agent tidak boleh:

- Mengedit file milik anggota lain agar task sendiri cepat selesai.
- Memindahkan folder milik anggota lain tanpa persetujuan.
- Mengganti nama endpoint yang sudah dipakai fitur lain secara sepihak.
- Mengubah tabel atau kolom database milik fitur lain tanpa koordinasi.
- Menghapus validasi authorization.
- Menambah AI, chat real-time, payment, WhatsApp integration, upload kompleks, atau fitur bonus lain tanpa permintaan jelas.
- Membuat ulang seluruh aplikasi ketika hanya diminta memperbaiki satu fitur.
- Menyimpan password dalam plain text.
- Membiarkan partner mengakses data organisasi lain.
- Menganggap semua warning atau test failure tidak penting.

## 6. Saat perubahan lintas fitur dibutuhkan

Jika sebuah task membutuhkan file di luar izin pemilik:

1. Jangan langsung mengubah file tersebut.
2. Beri tahu user file mana yang menjadi penghambat.
3. Usulkan perubahan sekecil mungkin.
4. Minta izin untuk perubahan lintas fitur.
5. Setelah mendapat izin, tulis perubahan tersebut pada deskripsi PR.

Contoh: halaman partner membutuhkan perubahan format response dari endpoint auth. Olssen tidak boleh langsung mengubah modul auth milik Cecil.

## 7. Aturan implementasi

- Gunakan nama variabel dan fungsi yang mudah dimengerti.
- Pisahkan route, controller, service, dan query bila kode mulai panjang.
- Validasi harus tetap dilakukan di backend walaupun frontend sudah melakukan validasi.
- Semua endpoint private harus memeriksa token.
- Semua endpoint admin harus memeriksa role admin.
- Partner hanya boleh mengambil atau mengubah data milik organisasinya.
- Jangan hard-code user ID, application ID, atau role untuk menyelesaikan demo.
- Tampilkan loading, error, dan empty state pada halaman yang mengambil data.
- Jangan log password, token, atau data sensitif ke console.

## 8. Sebelum merge ke main

Sebelum melakukan merge ke `main`, agent atau user harus:

1. Pastikan fitur sudah selesai dan teruji.

2. Pull perubahan terbaru dari `main`:
   ```bash
   git checkout main
   git pull origin main
   ```

3. Kembali ke branch kerja dan merge `main`:
   ```bash
   git checkout nama/branch-kamu
   git merge main
   ```

4. Periksa apakah ada konflik:
   - Jika ada konflik, selesaikan konflik terlebih dahulu
   - Jangan asal pilih "Accept Current" atau "Accept Incoming"
   - Baca kedua sisi perubahan dan pastikan kode tetap benar

5. Test ulang setelah merge:
   - Jalankan build: `npm run build`
   - Jalankan lint: `npm run lint`
   - Test fitur yang diubah

6. Baru merge ke `main` setelah yakin tidak ada konflik dan build berhasil:
   ```bash
   git checkout main
   git merge nama/branch-kamu
   git push origin main
   ```

## 9. Sebelum menyatakan task selesai

Agent harus:

- Menyebutkan file yang diubah.
- Menjelaskan apa yang sudah berfungsi.
- Menyebutkan hal yang belum selesai atau masih diasumsikan.
- Menjalankan pemeriksaan yang tersedia seperti lint, build, dan test.
- Memastikan perubahan hanya berada dalam path yang diizinkan.

## 10. Jika ada pertanyaan atau keputusan yang belum jelas

Jangan menebak diam-diam. Jika keputusan masih terbuka dan memengaruhi coding, tanyakan kepada user sebelum mengubah file.
