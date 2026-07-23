# GitHub Collaboration Workflow

## 1. Branch utama

- `main` harus selalu dalam kondisi yang dapat dijalankan.
- Tidak ada anggota yang boleh commit langsung ke `main`.
- Semua perubahan masuk melalui Pull Request.

## 2. Nama branch

Format:

```text
<nama>/<jenis>-<fitur>
```

Contoh:

```text
adin/feature-landing-page
cecil/feature-login
cecil/fix-register-validation
olssen/feature-create-application
olssen/fix-partner-filter
alvis/feature-admin-review
alvis/fix-deliverable-status
```

Gunakan huruf kecil dan tanda minus.

## 3. Alur kerja harian

Sebelum mulai:

```bash
git checkout main
git pull origin main
git checkout -b nama/feature-nama-fitur
```

Saat bekerja:

```bash
git status
git add <file-yang-memang-diubah>
git commit -m "feat(partner): add application form"
git push -u origin nama/feature-nama-fitur
```

**Catatan penting untuk Windows:**
- Gunakan PowerShell atau Git Bash
- Path separator: gunakan `/` atau `\` sesuai shell yang dipakai
- Jika pakai PowerShell dan ada spasi di path, gunakan quotes: `git add "Frontend/app/page.tsx"`

Setelah push:

1. Buat Pull Request ke `main`.
2. Tulis ringkasan perubahan.
3. Tulis cara mengetes.
4. Sebutkan file shared atau lintas fitur yang berubah.
5. Minta review minimal satu anggota lain.
6. Merge setelah review dan pemeriksaan selesai.

## 4. Format commit

Gunakan format sederhana:

```text
<type>(<scope>): <pesan>
```

Type yang dipakai:

- `feat`: fitur baru
- `fix`: perbaikan bug
- `refactor`: merapikan kode tanpa mengubah fungsi
- `docs`: perubahan dokumentasi
- `style`: perubahan tampilan atau formatting
- `test`: perubahan testing
- `chore`: konfigurasi atau maintenance

Contoh:

```text
feat(auth): add partner registration
fix(admin): prevent completing unfinished partnership
style(landing): improve mobile layout
docs: update API contract
```

## 5. Ukuran Pull Request

Satu PR sebaiknya hanya memiliki satu tujuan utama.

Baik:

- Register partner.
- Login dan redirect role.
- Create application form.
- Admin review action.

Kurang baik:

- Membuat login, dashboard admin, mengganti database, dan merombak navbar dalam satu PR.

PR kecil lebih mudah direview dan lebih sedikit konflik.

## 6. Isi deskripsi Pull Request

Gunakan format:

```markdown
## Ringkasan
Apa yang dibuat atau diperbaiki.

## Owner
Nama anggota dan fitur yang dimiliki.

## File utama
Daftar file penting yang berubah.

## Cara mengetes
1. Install dependencies:
   ```bash
   cd Frontend
   npm install
   cd ../Backend
   npm install
   ```
2. Setup database:
   ```bash
   cd Backend
   npx prisma migrate dev
   npx prisma db seed  # jika ada seed
   ```
3. Jalankan backend: `npm run dev` (port 3000 atau sesuai .env)
4. Jalankan frontend: `npm run dev` (port 3001 atau yang tersedia)
5. Login sebagai ...
6. Lakukan ...

## Dampak ke fitur lain
Tidak ada / jelaskan dampaknya.

## Checklist
- [ ] Hanya mengubah file yang diizinkan
- [ ] Tidak ada password atau secret di commit
- [ ] Tidak ada file `.env` yang ter-commit
- [ ] Validasi backend tersedia
- [ ] Loading, error, dan empty state ditangani
- [ ] TypeScript tidak ada error: `npm run build` (Frontend)
- [ ] Lint passed: `npm run lint` (Frontend)
```

## 7. Review

Reviewer memeriksa:

- Apakah perubahan sesuai scope.
- Apakah file yang diubah sesuai owner.
- Apakah authorization benar.
- Apakah API response tidak merusak fitur lain.
- Apakah error ditangani.
- Apakah terdapat secret atau password.
- Apakah kode cukup mudah dibaca.

Reviewer tidak perlu memaksakan gaya pribadi jika kode sudah jelas dan konsisten.

## 8. Konflik merge

Jika terjadi konflik:

- Owner file menjadi orang utama yang menyelesaikan konflik.
- Jangan memilih `Accept Current` atau `Accept Incoming` tanpa membaca kedua sisi.
- Setelah konflik selesai, jalankan ulang build dan alur terkait.
- Jika konflik berada di file shared, selesaikan bersama minimal dua anggota.

## 9. File yang tidak boleh di-commit

- `.env`
- Password database asli
- JWT secret
- `node_modules`
- File build seperti `.next`
- Log lokal
- Data pribadi nyata yang tidak dibutuhkan

Gunakan `.env.example` tanpa nilai rahasia.

## 10. Sinkronisasi setelah PR orang lain masuk

Sebelum melanjutkan branch lama:

```bash
git checkout main
git pull origin main
git checkout nama/branch-kamu
git merge main
```

Selesaikan konflik pada branch sendiri, bukan langsung di `main`.

## 11. Perubahan lintas fitur

Contoh: Olssen membutuhkan field baru dari auth Cecil.

Prosesnya:

1. Buat issue atau diskusikan contract API yang dibutuhkan.
2. Tentukan siapa yang mengubah file (biasanya owner file).
3. Owner file melakukan perubahan atau memberi izin tertulis.
4. Update dokumen jika contract API berubah.
5. Merge perubahan dependency terlebih dahulu.
6. Baru merge fitur yang bergantung padanya.

**Contoh kasus Prisma schema:**
Jika Olssen perlu menambah field di model `Application`, dan Cecil perlu menambah field di model `User`, koordinasikan dulu agar tidak konflik saat migrate. Bisa dengan:
- Membuat PR terpisah untuk perubahan schema
- Atau salah satu menunggu PR yang lain merge dulu
