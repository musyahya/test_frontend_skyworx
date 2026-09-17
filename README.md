# Test Frontend Skyworx

Aplikasi frontend berbasis Next.js untuk manajemen tugas harian dengan fitur autentikasi, dashboard todo, filter, dan tema gelap/terang.

## Fitur Utama

- Autentikasi pengguna: login dan register
- Dashboard tugas dengan CRUD sederhana
- Tambah, edit, hapus, dan ubah status tugas
- Filter pencarian berdasarkan nama dan status tugas
- Ringkasan tugas dalam kartu statistik
- Dukungan tema light/dark mode
- Notifikasi toast untuk feedback pengguna
- Integrasi React Query untuk state management data server-side

## Stack Teknologi

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- TanStack React Query
- Zustand
- Zod + React Hook Form
- Axios

## Struktur Proyek

```bash
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (logged)/
│   ├── api/
│   │   ├── login/
│   │   ├── register/
│   │   ├── todo/
│   │   └── user/
│   └── layout.tsx
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── data/
├── hooks/
├── lib/
├── queries/
├── schemas/
├── stores/
├── styles/
├── types/
└── ...
```

## Prasyarat

Pastikan perangkat Anda sudah memiliki:

- Node.js 20+
- Bun 1.4+ (direkomendasikan, sesuai packageManager)

## Instalasi

```bash
bun install
```

## Menjalankan Aplikasi

Untuk menjalankan server development:

```bash
bun run dev
```

Setelah itu, buka browser ke:

```bash
http://localhost:3000
```

## Script yang Tersedia

```bash
bun run dev     # menjalankan aplikasi di mode development
bun run build   # membangun aplikasi untuk produksi
bun run start   # menjalankan build yang sudah dibuat
bun run lint    # menjalankan eslint
```

## Alur Aplikasi

1. Pengguna mendaftar pada halaman register.
2. Setelah berhasil, pengguna login menggunakan email dan password.
3. Setelah autentikasi berhasil, pengguna diarahkan ke dashboard.
4. Di dashboard, pengguna dapat:
   - melihat ringkasan todos
   - menambah task baru
   - mengedit task
   - menghapus task
   - memfilter dan mencari task
   - mengubah status task

## Catatan Implementasi

- Data todo bersifat dummy dan dikelola di folder `src/data` serta API route di `src/app/api`.
- Autentikasi dan sesi pengguna diatur melalui cookie serta provider di `src/components/templates`.
- Validasi form menggunakan Zod dan React Hook Form.

## Lisensi

Proyek ini dibuat untuk kebutuhan test frontend dan digunakan sebagai contoh implementasi aplikasi tugas modern.
