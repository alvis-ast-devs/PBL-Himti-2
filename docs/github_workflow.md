# GitHub Collaboration Workflow

## 1. Branch utama

- `main` harus selalu dalam kondisi yang dapat dijalankan.
- Tidak ada anggota yang boleh commit langsung ke `main`.
- Semua perubahan masuk melalui merge dari branch fitur setelah dicek tidak bertabrakan.

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

Sebelum merge ke `main`:

1. Pastikan fitur sudah selesai dan teruji.
2. Pull perubahan terbaru dari `main`:
   ```bash
   git checkout main
   git pull origin main
   ```
3. Kembali ke branch fitur dan merge `main`:
   ```bash
   git checkout nama/feature-nama-fitur
   git merge main
   ```
4. Selesaikan konflik jika ada.
5. Test ulang: `npm run build` dan `npm run lint`.
6. Jika tidak ada masalah, merge ke `main`:
   ```bash
   git checkout main
   git merge nama/feature-nama-fitur
   git push origin main
   ```
7. Hapus branch fitur (opsional):
   ```bash
   git branch -d nama/feature-nama-fitur
   git push origin --delete nama/feature-nama-fitur
   ```

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

## 5. Ukuran branch fitur

Satu branch sebaiknya hanya memiliki satu tujuan utama.

Baik:

- Register partner.
- Login dan redirect role.
- Create application form.
- Admin review action.

Kurang baik:

- Membuat login, dashboard admin, mengganti database, dan merombak navbar dalam satu branch.

Branch kecil lebih mudah di-merge dan lebih sedikit konflik.

## 6. Checklist sebelum merge ke main

Sebelum merge branch fitur ke `main`, pastikan:

- [ ] Fitur sudah selesai dan berfungsi
- [ ] Hanya mengubah file yang diizinkan sesuai feature ownership
- [ ] Tidak ada password atau secret di commit
- [ ] Tidak ada file `.env` yang ter-commit
- [ ] Sudah pull dan merge `main` ke branch fitur
- [ ] Konflik sudah diselesaikan (jika ada)
- [ ] Build berhasil: `npm run build` (Frontend)
- [ ] Lint passed: `npm run lint` (Frontend)
- [ ] Backend berjalan tanpa error
- [ ] Fitur sudah ditest manual
- [ ] Validasi backend tersedia
- [ ] Loading, error, dan empty state ditangani (untuk frontend)

## 7. Komunikasi tim

Walaupun tidak ada review wajib, tetap komunikasikan:

- Jika mengubah file shared, beritahu di grup
- Jika mengubah `prisma/schema.prisma`, koordinasi dulu
- Jika mengubah contract API yang dipakai orang lain, diskusikan dulu
- Jika ada bug di fitur orang lain, beritahu ownernya

## 8. Konflik merge

Jika terjadi konflik:

- Owner file menjadi orang utama yang menyelesaikan konflik.
- Jangan memilih `Accept Current` atau `Accept Incoming` tanpa membaca kedua sisi.
- Setelah konflik selesai, jalankan ulang build dan alur terkait.
- Jika konflik berada di file shared, selesaikan bersama minimal dua anggota.

## 9. File yang tidak boleh di-commit

- `.env` (Backend dan Frontend)
- Password database asli
- JWT secret
- `node_modules/`
- File build seperti `.next/`, `dist/`
- Log lokal
- Data pribadi nyata yang tidak dibutuhkan
- Prisma migrations yang belum final (koordinasi dulu)

Gunakan `.env.example` tanpa nilai rahasia sebagai template.

## 10. Sinkronisasi dengan main

Sebelum melanjutkan branch lama atau sebelum merge ke main:

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

1. Diskusikan di grup: contract API atau perubahan yang dibutuhkan.
2. Tentukan siapa yang mengubah file (biasanya owner file).
3. Owner file melakukan perubahan di branch sendiri.
4. Owner file merge ke `main` lebih dulu.
5. Anggota lain pull `main` dan merge ke branch mereka.
6. Baru lanjut mengerjakan fitur yang bergantung padanya.

**Contoh kasus Prisma schema:**
Jika Olssen perlu menambah field di model `Application`, dan Cecil perlu menambah field di model `User`, koordinasikan dulu agar tidak konflik saat migrate. Bisa dengan:
- Salah satu merge dulu, yang lain pull dan lanjut
- Atau diskusikan untuk gabung perubahan schema dalam satu commit
