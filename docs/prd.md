# Product Requirements Document — HIMTI PartnerHub

## 1. Ringkasan

HIMTI PartnerHub adalah aplikasi web full-stack untuk mengelola pengajuan media partnership antara HIMTI dan organisasi eksternal.

Aplikasi hanya perlu cukup lengkap untuk PBL. Fokus utamanya adalah alur yang berjalan, hak akses yang benar, database yang rapi, dan demo yang mudah dipahami.

**Tech Stack:**
- Frontend: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS
- Backend: Express + TypeScript + Prisma ORM
- Database: PostgreSQL (Supabase)

## 2. Masalah

Proses media partnership dapat bermasalah karena:

- Data proposal, kontak, dan kesepakatan tersebar.
- Partner tidak tahu status terbaru tanpa bertanya lewat chat.
- Catatan revisi sulit dilacak.
- Kewajiban seperti Story, broadcast, logo, atau sertifikat bisa terlupa.
- Link bukti publikasi tidak tersimpan bersama pengajuan.
- Riwayat kerja sama sulit dicari oleh pengurus berikutnya.

## 3. Tujuan produk

- Menyimpan pengajuan media partner dalam satu sistem.
- Memberi status yang jelas kepada partner.
- Membantu admin memeriksa, menyetujui, menolak, atau meminta revisi.
- Menyimpan checklist kewajiban HIMTI dan partner.
- Menyimpan link bukti pengerjaan.
- Menyimpan riwayat perubahan status.

## 4. Non-goals

Versi PBL tidak mengelola:

- Keuangan dan pembayaran.
- Desain poster.
- Chat real-time.
- Integrasi WhatsApp.
- Payment gateway.
- AI.
- Upload file kompleks.
- Sistem notifikasi yang rumit.

## 5. Pengguna

### Partner

Partner adalah organisasi atau panitia eksternal yang mengajukan media partnership.

Partner dapat:

- Register dan login.
- Membuat pengajuan.
- Melihat pengajuan miliknya.
- Melihat status dan catatan admin.
- Mengubah pengajuan ketika revisi diminta.
- Mengisi link bukti untuk kewajiban partner.

### Admin HIMTI

Admin dapat:

- Login menggunakan akun admin yang sudah dibuat melalui seed.
- Melihat seluruh pengajuan.
- Memeriksa detail dan proposal.
- Mengubah status sesuai alur.
- Memberikan catatan.
- Membuat checklist kewajiban.
- Memperbarui kewajiban HIMTI.
- Menutup kerja sama sebagai Completed.

## 6. Status pengajuan

Working flow yang digunakan dokumen ini:

1. `Draft` - pengajuan baru yang belum dikirim (opsional, bisa langsung `Submitted`)
2. `Submitted` - pengajuan sudah dikirim dan menunggu review
3. `Under Review` - admin sedang memeriksa
4. `Revision Required` - admin meminta partner memperbaiki
5. `Approved` - pengajuan disetujui, kerja sama dimulai
6. `Rejected` - pengajuan ditolak
7. `Completed` - kerja sama selesai

**Catatan:** Status di Prisma schema saat ini default adalah `"Draft"`. Tim bisa memutuskan apakah:
- Menggunakan Draft sebagai status awal (form bisa disimpan sementara), atau
- Langsung Submitted saat form dikirim (tanpa fitur draft)

Perpindahan yang valid:

- `Draft` → `Submitted` (jika pakai draft)
- `Submitted` → `Under Review`
- `Under Review` → `Revision Required`
- `Revision Required` → `Submitted`
- `Under Review` → `Approved`
- `Under Review` → `Rejected`
- `Approved` → `Completed`

Backend wajib menolak perpindahan status lain.

## 7. Data register

- Nama organisasi
- Nama penanggung jawab
- Email
- Nomor WhatsApp
- Instagram organisasi, opsional
- Password

Akun admin tidak memiliki halaman register publik.

## 8. Data pengajuan

- Nama acara
- Nama penyelenggara
- Deskripsi acara
- Tanggal acara
- Lokasi atau platform
- Target peserta
- Link proposal
- Instagram organisasi
- Kontak penanggung jawab
- Permintaan publikasi
- Deadline publikasi

Validasi minimum:

- Field wajib tidak boleh kosong.
- Link proposal harus berbentuk URL.
- Tanggal acara harus valid.
- Deadline publikasi tidak boleh melewati tanggal acara.
- Partner hanya dapat mengakses pengajuan miliknya.

## 9. Halaman dan acceptance criteria

### Landing Page — Adin

Isi minimum:

- Seluruh copy Landing Page menggunakan bahasa Inggris.
- Penjelasan singkat bahwa PartnerHub membantu organisasi eksternal mengajukan
  media partnership kepada HIMTI.
- Penjelasan fungsi utama: pengajuan, review atau revisi, serta penyelesaian
  deliverable dan bukti kerja sama.
- Penjelasan alur pengajuan.
- Checklist "What to Prepare" berdasarkan data pengajuan.
- Tombol menuju Register.
- Tombol menuju Login.
- Link menuju website resmi HIMTI OFOG.

Diterima jika:

- Landing Page terbuka pada `/`.
- `/landing` mengarahkan user ke Landing Page utama.
- Tampilan dapat dibuka di desktop dan mobile.
- Tombol menuju halaman yang benar.
- Link website HIMTI membuka `https://ofog.himtibinus.or.id/`.
- Tidak ada form register kedua di Landing Page.

### Register — Cecil

Diterima jika:

- Partner dapat membuat akun dengan data valid.
- Email duplikat ditolak.
- Password tidak disimpan dalam plain text (gunakan bcrypt atau argon2).
- Error validasi tampil dengan jelas.
- Register berhasil mengarahkan user ke Login atau langsung login, sesuai keputusan tim.
- Data organisasi tersimpan di tabel `organizations` yang ter-relasi dengan `users`.

### Login — Cecil

Diterima jika:

- Partner dan admin dapat login.
- Kredensial salah menghasilkan pesan error.
- User login mendapatkan token (JWT) atau session.
- Token/session disimpan dengan aman (httpOnly cookie atau secure storage).
- User diarahkan ke dashboard sesuai role (`/partner` atau `/admin`).

### Partner Dashboard — Olssen

Diterima jika:

- Menampilkan ringkasan pengajuan milik partner.
- Tidak menampilkan data organisasi lain.
- Memiliki loading, error, dan empty state.

### My Applications — Olssen

Diterima jika:

- Menampilkan daftar pengajuan milik partner.
- Dapat mencari berdasarkan nama acara.
- Dapat memfilter berdasarkan status.
- Item dapat dibuka ke halaman detail.

### Create Application — Olssen

Diterima jika:

- Form mengirim data ke backend.
- Pengajuan berstatus `Submitted` setelah dikirim (atau `Draft` jika fitur draft dipakai).
- Field wajib divalidasi frontend dan backend.
- Backend memastikan `organization_id` diambil dari token user, bukan dari request body.
- Setelah berhasil, user masuk ke detail atau daftar pengajuan.

### Application Detail / Revision — Olssen

Diterima jika:

- Menampilkan detail, status, catatan admin, checklist, bukti, dan riwayat.
- Data hanya dapat diedit ketika status `Revision Required`.
- Setelah revisi dikirim, status kembali ke `Submitted`.
- Partner hanya dapat mengubah bukti kewajiban yang menjadi tanggung jawab partner (`responsible_party = "partner"`).
- Partner tidak dapat mengakses pengajuan organisasi lain.

### Admin Dashboard — Alvis

Diterima jika:

- Menampilkan jumlah pengajuan berdasarkan status.
- Menampilkan pengajuan terbaru.
- Hanya dapat diakses admin.

### Manage Applications — Alvis

Diterima jika:

- Menampilkan seluruh pengajuan.
- Dapat mencari berdasarkan nama acara atau organisasi.
- Dapat memfilter berdasarkan status.
- Dapat membuka halaman review.

### Review Application — Alvis

Diterima jika:

- Admin dapat melihat semua data pengajuan dan link proposal.
- Admin dapat mulai review.
- Admin dapat meminta revisi dengan catatan.
- Admin dapat approve atau reject dengan alasan yang jelas.
- Perubahan status masuk ke riwayat.

### Partnership Progress — Alvis

Diterima jika:

- Admin dapat membuat kewajiban untuk HIMTI atau partner (`responsible_party: "partner"` atau `"himti"`).
- Status kewajiban dapat diperbarui (`Pending`, `Completed`).
- Bukti dapat disimpan sebagai URL di field `evidence_url`.
- Pengajuan hanya dapat menjadi `Completed` ketika semua deliverable berstatus `Completed`.

## 10. MVP

Fitur wajib:

- Register partner.
- Login dan logout.
- Authentication dan role authorization.
- Membuat dan melihat pengajuan.
- Review admin.
- Revisi partner.
- Approve dan reject.
- Checklist kewajiban.
- Link bukti.
- Search dan filter sederhana.
- Riwayat status.

## 11. Fitur bonus

Hanya dikerjakan setelah MVP stabil:

- Chart dashboard.
- Export CSV.
- Upload file.
- Email notification.
- Generate PDF.
- Reminder deadline.

## 12. Alur demo

1. Register sebagai partner.
2. Login sebagai partner.
3. Membuat pengajuan.
4. Login sebagai admin.
5. Membuka pengajuan dan meminta revisi.
6. Partner memperbaiki pengajuan.
7. Admin menyetujui pengajuan.
8. Admin membuat checklist kewajiban.
9. Partner dan admin menambahkan bukti.
10. Admin menutup kerja sama sebagai Completed.
