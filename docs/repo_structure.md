# Struktur Repository

Struktur ini dibuat agar kepemilikan fitur terlihat jelas dan konflik berkurang.

```text
PBL-Himti-2/
├── AGENTS.md
├── README.md
├── docs/
│   ├── prd.md
│   ├── feature_ownership.md
│   ├── github_workflow.md
│   └── repo_structure.md
│
├── Frontend/
│   ├── package.json
│   ├── package-lock.json
│   ├── next.config.ts
│   ├── tailwind.config.*
│   ├── postcss.config.mjs
│   ├── eslint.config.mjs
│   ├── tsconfig.json
│   ├── .env.example
│   ├── public/
│   │   ├── next.svg
│   │   ├── vercel.svg
│   │   └── landing/                  # Adin
│   ├── app/
│   │   ├── layout.tsx                # Shared
│   │   ├── globals.css               # Shared
│   │   ├── page.tsx                  # Adin - Landing Page
│   │   ├── login/                    # Cecil
│   │   │   └── page.tsx
│   │   ├── register/                 # Cecil
│   │   │   └── page.tsx
│   │   ├── partner/                  # Olssen
│   │   │   ├── page.tsx
│   │   │   └── applications/
│   │   │       ├── page.tsx
│   │   │       ├── new/page.tsx
│   │   │       └── [id]/page.tsx
│   │   └── admin/                    # Alvis
│   │       ├── page.tsx
│   │       └── applications/
│   │           ├── page.tsx
│   │           └── [id]/page.tsx
│   ├── components/
│   │   ├── shared/                   # Shared, protected
│   │   ├── landing/                  # Adin
│   │   ├── auth/                     # Cecil
│   │   ├── partner/                  # Olssen
│   │   └── admin/                    # Alvis
│   └── lib/
│       ├── api/
│       │   ├── public.ts             # Adin, optional
│       │   ├── auth.ts               # Cecil
│       │   ├── partner.ts            # Olssen
│       │   └── admin.ts              # Alvis
│       └── auth/                     # Cecil
│
└── Backend/
    ├── package.json
    ├── package-lock.json
    ├── tsconfig.json
    ├── .env
    ├── .env.example
    ├── index.ts                       # Main server file (shared)
    ├── prisma/
    │   ├── schema.prisma              # Shared database schema (koordinasi wajib)
    │   └── seed.ts                    # Cecil - admin seed
    ├── middleware/
    │   ├── authenticate.ts            # Cecil
    │   ├── authorize.ts               # Cecil
    │   └── errorHandler.ts            # Shared
    └── features/
        ├── public/                    # Adin, optional
        ├── auth/                      # Cecil
        ├── partner-applications/      # Olssen
        ├── partner-deliverables/      # Olssen
        ├── admin-review/              # Alvis
        └── admin-deliverables/        # Alvis
```

## Aturan struktur

- Jangan membuat folder baru dengan fungsi yang sama tanpa diskusi.
- Jangan menaruh query database langsung di komponen React.
- Jangan menaruh password hashing di frontend.
- Jangan mencampur endpoint admin dan partner dalam satu file besar jika dapat dipisahkan.
- Shared component hanya untuk komponen yang benar-benar digunakan minimal dua fitur.
- Jangan memindahkan komponen ke `shared` hanya karena mungkin akan dipakai nanti.
- Gunakan Prisma Client untuk query database, bukan raw SQL.
- Semua perubahan schema database harus melalui `prisma/schema.prisma` dan di-migrate dengan `npx prisma migrate dev`.
- Folder yang belum ada (seperti `components/`, `lib/`, `features/`, `middleware/`) akan dibuat sesuai kebutuhan oleh pemilik fitur masing-masing.

## Teknologi yang digunakan

- **Frontend**: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS
- **Backend**: Express + TypeScript + Prisma ORM
- **Database**: PostgreSQL (Supabase)

## Catatan penting

- Repository ini menggunakan TypeScript (`.ts`, `.tsx`)
- Backend menggunakan Prisma ORM, bukan raw SQL migrations
- Frontend menggunakan Next.js App Router (`app/` directory), bukan Pages Router
- Folder menggunakan PascalCase: `Frontend/`, `Backend/`
- Semua perubahan ke `prisma/schema.prisma` memerlukan koordinasi antar tim
