# HIMTI PartnerHub UI/UX Guidelines

Dokumen ini adalah acuan bersama untuk Landing Page, Authentication, Partner,
dan Admin. Tujuannya adalah menjaga tampilan dan pengalaman pengguna tetap
konsisten walaupun setiap fitur dikerjakan oleh owner yang berbeda.

## 1. Referensi visual

Gunakan website resmi [HIMTI - One Family One Goal](https://ofog.himtibinus.or.id/)
sebagai referensi utama untuk karakter visual HIMTI: identitas biru-putih,
tipografi bersih, ruang yang lega, dan penggunaan logo.

Referensi bukan berarti menyalin halaman OFOG secara persis. PartnerHub adalah
aplikasi operasional, sehingga keterbacaan form, tabel, status, dan aksi pengguna
harus lebih diprioritaskan daripada dekorasi.

Urutan sumber keputusan desain:

1. Token bersama di `Frontend/app/globals.css`.
2. Aturan dalam dokumen ini.
3. Pola visual website OFOG sebagai inspirasi.
4. Keputusan baru yang sudah disepakati oleh tim.

## 2. Temuan saat ini

- Identitas visual utama HIMTI berpusat pada biru dan putih.
- Palette di bawah dibuat agar sangat dekat dengan tampilan OFOG. Karena
  stylesheet halaman utama sempat mengalami timeout saat diperiksa, hex ini
  adalah palette PartnerHub yang disepakati, bukan klaim kode warna resmi HIMTI.
- Stylesheet OFOG yang dapat diperiksa pada 23 Juli 2026 menggunakan
  **Public Sans** sebagai font utama dengan weight 200, 400, 500, dan 700.
- Stylesheet tersebut juga memuat Jacques Francois, tetapi tidak ditemukan
  selector aktif yang menggunakannya. PartnerHub memakai Public Sans agar
  tipografi seluruh fitur tetap konsisten.

## 3. Color palette

Jangan menggunakan warna Tailwind acak seperti `blue-500`, `sky-600`, atau
`cyan-400`. Gunakan token semantik berikut.

| Peran | Hex | CSS variable | Tailwind utility example |
| --- | --- | --- | --- |
| Primary blue | `#0066B3` | `--color-primary` | `bg-brand`, `text-brand` |
| Dark blue | `#004A82` | `--color-primary-dark` | `bg-brand-dark` |
| Bright blue | `#1689D8` | `--color-primary-bright` | `text-brand-bright` |
| Light blue | `#DDEFFC` | `--color-primary-light` | `bg-brand-light` |
| Pale blue | `#F2F9FE` | `--color-primary-pale` | `bg-brand-pale` |
| White/card | `#FFFFFF` | `--color-white` | `bg-card` |
| Soft surface | `#FAFCFE` | `--color-surface` | `bg-surface-soft` |
| Main text | `#102A43` | `--color-text` | `text-ink` |
| Muted text | `#5F7485` | `--color-text-muted` | `text-muted` |
| Border | `#C9DCEB` | `--color-border` | `border-line` |
| Disabled | `#A9BAC8` | `--color-disabled` | `bg-control-disabled` |

Default usage:

- Navbar/sidebar: dark blue.
- Primary button and active link: primary blue.
- Primary-button hover: dark blue.
- Page background: pale blue.
- Card, modal, and form surface: white.
- Heading and important content: main text.
- Supporting copy and placeholders: muted text.
- Input, table, and card border: border color.
- Bright blue is an accent; do not use it for small text on white.

Green, yellow, orange, and red are reserved for status, validation, alerts, and
destructive actions. They must not become the main color of a page.

## 4. Application status colors

| Status | Background | Text | Tailwind example |
| --- | --- | --- | --- |
| Submitted | `#DDEFFC` | `#004A82` | `bg-status-submitted-surface text-status-submitted-foreground` |
| Under Review | `#FEF3C7` | `#92400E` | `bg-status-review-surface text-status-review-foreground` |
| Approved | `#DCFCE7` | `#166534` | `bg-status-approved-surface text-status-approved-foreground` |
| Rejected | `#FEE2E2` | `#991B1B` | `bg-status-rejected-surface text-status-rejected-foreground` |
| Completed | `#DBEAFE` | `#1E3A8A` | `bg-status-completed-surface text-status-completed-foreground` |

`Draft` can use the neutral surface and muted-text tokens. `Revision Required`
should use the review colors until the team explicitly adds a separate semantic
token.

## 5. Typography

PartnerHub uses **Public Sans** globally through `next/font`. Use `font-sans`;
do not import another UI font inside a feature.

Recommended hierarchy:

| Element | Mobile | Desktop | Weight |
| --- | --- | --- | --- |
| Page/hero title | `text-3xl` | `text-4xl` or `text-5xl` | 700 |
| Section title | `text-xl` | `text-2xl` | 700 |
| Card title | `text-lg` | `text-xl` | 500 or 700 |
| Body | `text-base` | `text-base` | 400 |
| Supporting text | `text-sm` | `text-sm` | 400 |
| Label/button | `text-sm` | `text-sm` or `text-base` | 500 or 700 |

- Keep body line height at least 1.4.
- Use sentence case for headings and buttons.
- Avoid long paragraphs in dashboards; split content into scannable sections.
- Use monospace only for technical identifiers or code.

## 6. Layout and spacing

- Design mobile-first, then verify tablet and desktop layouts.
- Use a consistent content width such as `max-w-7xl` with responsive horizontal
  padding: `px-4 sm:px-6 lg:px-8`.
- Use Tailwind spacing values. Prefer 4, 6, 8, and 12 for major gaps.
- Keep related items close and separate unrelated sections with more space.
- Cards should normally use `rounded-xl`, `border border-line`, `bg-card`, and
  `p-4 sm:p-6`.
- Use shadows sparingly. Borders and surface contrast should define most cards.
- Tables must remain usable on small screens through horizontal scrolling or an
  intentional card layout.

## 7. Shared component patterns

### Primary button

```tsx
<button className="rounded-lg bg-brand px-4 py-2 font-medium text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:bg-control-disabled">
  Submit application
</button>
```

### Secondary button

```tsx
<button className="rounded-lg border border-line bg-card px-4 py-2 font-medium text-ink transition-colors hover:bg-brand-pale focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
  Cancel
</button>
```

### Card

```tsx
<section className="rounded-xl border border-line bg-card p-4 sm:p-6">
  Card content
</section>
```

### Form controls

- Labels must be visible; placeholders do not replace labels.
- Keep field height, radius, padding, and focus states consistent.
- Put validation messages directly below the relevant field.
- Required fields must be identifiable without relying only on color.
- Disable submission while a request is in progress.

## 8. Required UX states

Every page that fetches data must provide:

- **Loading:** skeleton or concise progress message.
- **Error:** human-readable explanation and a retry action when useful.
- **Empty:** explain why no content exists and provide the next relevant action.
- **Success:** confirm important actions such as submission or status changes.

Never show a blank screen while loading. Do not expose raw API errors, tokens, or
internal identifiers to users.

Destructive actions and irreversible status changes require clear wording and,
when appropriate, confirmation. The main action on a page should remain visually
obvious; avoid presenting several competing primary buttons.

## 9. Accessibility

- Maintain WCAG AA contrast for normal text.
- Preserve a visible keyboard focus indicator.
- Use semantic HTML before adding ARIA.
- Add meaningful `alt` text to informative images; use empty `alt` text for
  purely decorative images.
- Do not communicate status using color alone; always include a text label.
- Interactive targets should be at least 44 by 44 CSS pixels where practical.
- Forms must support keyboard navigation and associate errors with their fields.
- Respect user zoom and avoid fixed heights that clip content.

## 10. Brand assets

Reusable files are stored in `Frontend/public/brand/`.

| File | Purpose | Public URL |
| --- | --- | --- |
| `himti-mark.png` | Standalone HIMTI cube mark | `/brand/himti-mark.png` |
| `himti-lockup.png` | HIMTI mark with organization and BINUS text | `/brand/himti-lockup.png` |
| `binus-university-logo.png` | BINUS University logo | `/brand/binus-university-logo.png` |

Example:

```tsx
import Image from "next/image";

<Image
  src="/brand/himti-mark.png"
  alt="HIMTI"
  width={64}
  height={64}
/>
```

- Keep the original aspect ratio.
- Do not recolor, stretch, crop, rotate, or add effects to a logo.
- Give the logo enough clear space around it.
- Use the standalone mark when space is limited and the full lockup when the
  organization identity needs to be explicit.
- Confirm authorization and context before using a logo outside this project.

## 11. Team checklist

Before marking UI work complete:

- Use Public Sans and the shared color tokens.
- Compare the result with the OFOG visual character.
- Verify mobile and desktop layouts.
- Check loading, error, empty, and success states.
- Test keyboard focus and form labels.
- Avoid random colors, one-off spacing, and duplicate component patterns.
- Run frontend lint and build.
- Follow feature ownership before changing shared files or another owner's files.

New brand colors, font families, shared components, or changes to existing tokens
require team approval because they affect every feature.

## 12. Push and merge handoff

Setelah menyelesaikan perubahan, agent tidak boleh langsung mengubah `main`.
Gunakan urutan berikut:

1. Jelaskan file yang diubah, fungsi yang sudah berjalan, asumsi atau pekerjaan
   yang belum selesai, serta hasil lint, build, dan test yang relevan.
2. Tanyakan kepada user apakah perubahan tersebut ingin di-commit dan di-push ke
   branch fitur.
3. Jika user menyetujui, stage hanya file yang termasuk scope, lalu commit dan
   push branch fitur. Jangan ikut memasukkan perubahan lokal milik user atau
   fitur lain.
4. Setelah push berhasil, ambil `main` terbaru dan sinkronkan ke branch fitur:

   ```bash
   git fetch origin
   git merge origin/main
   ```

5. Jika terjadi konflik, jangan merge ke `main`. Jelaskan file yang bertabrakan,
   koordinasikan dengan owner, selesaikan konflik dengan membaca kedua sisi, dan
   jalankan ulang pemeriksaan yang relevan.
6. Jika merge dari `origin/main` menambah commit baru ke branch fitur, push ulang
   branch tersebut setelah pemeriksaan berhasil.
7. Jika `main` terbaru berhasil digabungkan tanpa konflik dan pemeriksaan tetap
   berhasil, tanyakan:

   > Perubahan sudah di-push dan tidak ada tabrakan dengan `main` terbaru. Apakah
   > ingin saya merge ke `main`?

8. Hanya setelah user menjawab setuju, pindah ke `main`, tarik versi terbaru,
   merge branch fitur, jalankan pemeriksaan akhir, lalu push `main`:

   ```bash
   git checkout main
   git pull origin main
   git merge nama/branch-fitur
   cd Frontend
   npm run lint
   npm run build
   cd ..
   git push origin main
   ```

Pull request boleh digunakan bila tim menginginkan review, tetapi tidak wajib.
Yang wajib adalah izin user, `main` terbaru, tidak ada konflik yang belum
diselesaikan, dan hasil pemeriksaan yang berhasil sebelum `main` di-push.
