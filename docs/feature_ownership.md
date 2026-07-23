# Feature Ownership dan Batas File

## 1. Prinsip kerja

Pembagian tim menggunakan **vertical feature ownership**.

Contoh: Olssen tidak hanya membuat tampilan halaman partner. Olssen juga mengerjakan request API, endpoint partner, validasi, dan query yang dibutuhkan halaman partner.

Kepemilikan bukan berarti anggota lain tidak boleh memberi saran atau review. Kepemilikan berarti hanya owner yang boleh mengubah file fitur tersebut tanpa izin tambahan.

## 2. Adin — Landing Page

Tanggung jawab:

- Landing Page.
- Responsiveness Landing Page.
- CTA menuju Register dan Login.
- Komponen visual khusus Landing Page.

Path yang boleh diubah:

```text
Frontend/app/page.tsx
Frontend/components/landing/**
Frontend/public/landing/**
Frontend/lib/api/public.ts              # hanya jika dibutuhkan
Backend/features/public/**              # hanya jika dibutuhkan
```

Catatan:

Landing Page dapat dibuat statis. Jangan menambah endpoint backend hanya agar terlihat full-stack jika endpoint tersebut tidak memiliki kegunaan nyata.

## 3. Cecil — Authentication

Tanggung jawab:

- Register partner.
- Login partner dan admin.
- Logout.
- Membaca user aktif.
- Password hashing.
- JWT/session.
- Middleware login dan role.
- Seed akun admin.

Path yang boleh diubah:

```text
Frontend/app/login/**
Frontend/app/register/**
Frontend/components/auth/**
Frontend/lib/api/auth.ts
Frontend/lib/auth/**
Backend/features/auth/**
Backend/middleware/authenticate.ts
Backend/middleware/authorize.ts
Backend/prisma/schema.prisma     # model User, Organization saja
Backend/prisma/seed.ts           # untuk admin seed
```

Contract yang harus dijaga:

- User aktif memiliki minimal `id`, `email`, `role`, dan informasi organisasi bila partner.
- Role hanya `partner` atau `admin`.
- Endpoint private memberikan status `401` jika tidak login.
- Endpoint admin memberikan status `403` jika role bukan admin.

## 4. Olssen — Partner Features

Tanggung jawab:

- Partner Dashboard.
- My Applications.
- Create Application.
- Application Detail.
- Edit atau Revision.
- Bukti untuk kewajiban partner.

Path yang boleh diubah:

```text
Frontend/app/partner/**
Frontend/components/partner/**
Frontend/lib/api/partner.ts
Backend/features/partner-applications/**
Backend/features/partner-deliverables/**
Backend/prisma/schema.prisma     # model Application saja, koordinasi dengan Cecil
```

Contract yang harus dijaga:

- Partner tidak pernah mengirim `organization_id` untuk menentukan kepemilikan. Backend mengambil organisasi dari token user.
- Semua query partner harus difilter berdasarkan organisasi user aktif.
- Create Application langsung membuat status `SUBMITTED`.
- Edit hanya boleh ketika `REVISION_REQUIRED`.
- Partner hanya dapat mengubah bukti deliverable dengan `responsible_party = partner`.

## 5. Alvis — Admin Features

Tanggung jawab:

- Admin Dashboard.
- Manage Applications.
- Review Application.
- Perubahan status.
- Catatan admin.
- Partnership Progress.
- Pembuatan dan pembaruan deliverable.
- Menutup kerja sama.

Path yang boleh diubah:

```text
Frontend/app/admin/**
Frontend/components/admin/**
Frontend/lib/api/admin.ts
Backend/features/admin-review/**
Backend/features/admin-deliverables/**
Backend/prisma/schema.prisma     # model Deliverable, StatusHistory saja, koordinasi
```

Contract yang harus dijaga:

- Semua endpoint admin wajib memakai authorization role admin.
- Status tidak boleh berubah secara bebas.
- Request revisi harus memiliki catatan.
- Reject harus memiliki alasan.
- Completed hanya boleh dilakukan jika semua deliverable selesai.

## 6. File bersama

Path berikut tidak memiliki satu owner dan dianggap dilindungi:

```text
AGENTS.md
README.md
docs/**
.env.example
.gitignore
Frontend/package.json
Frontend/package-lock.json
Frontend/next.config.ts
Frontend/tailwind.config.*
Frontend/postcss.config.*
Frontend/eslint.config.mjs
Frontend/app/layout.tsx
Frontend/app/globals.css
Frontend/components/shared/**
Backend/package.json
Backend/package-lock.json
Backend/index.ts
Backend/prisma/schema.prisma     # koordinasi wajib untuk model bersama
```

Perubahan file bersama membutuhkan izin eksplisit dan harus dijelaskan dalam PR.

## 7. Matriks perubahan

| Situasi | Boleh langsung? | Tindakan |
|---|---:|---|
| Mengubah file fitur sendiri | Ya | Kerjakan di branch sendiri |
| Membaca file fitur orang lain | Ya | Jangan edit |
| Memperbaiki bug di file orang lain | Tidak | Buat issue atau minta izin owner |
| Mengubah response API yang dipakai orang lain | Tidak | Sepakati contract terlebih dahulu |
| Menambah kolom database baru | Tidak selalu | Koordinasi jika dipakai lebih dari satu fitur |
| Mengubah file shared | Tidak | Minta izin dan jelaskan dampaknya |
| Review PR orang lain | Ya | Boleh memberi komentar atau saran |

## 8. Perubahan darurat

Jika build gagal karena file orang lain:

- Jangan diam-diam memperbaikinya.
- Catat error lengkap.
- Hubungi owner.
- Bila user memberi izin lintas fitur, lakukan perubahan minimum dan tulis di PR.
