# SANDIKALE — Login Multi-Device & Role Admin/Kasir

Paket ini mengubah penyimpanan user dari `localStorage` menjadi **Supabase Auth + database cloud**, sehingga akun yang dibuat dari laptop dapat dipakai dari HP selama membuka website SANDIKALE yang sama.

## A. Buat project Supabase

1. Buat project baru di Supabase.
2. Buka **SQL Editor**.
3. Jalankan seluruh isi `supabase/schema.sql`.

## B. Buat Admin pertama

Untuk keamanan, paket ini **tidak lagi membuat akun admin otomatis dengan password bawaan**. Buat Admin pertama dari dashboard Supabase:

1. Buka **Authentication → Users**.
2. Pilih **Add user**.
3. Email: `admin@users.sandikale.local`
4. Buat password Admin sendiri (minimal 6 karakter).
5. Pastikan user dibuat/confirmed.
6. Salin **User UID** yang muncul.
7. Kembali ke **SQL Editor** dan jalankan:

```sql
insert into public.sandikale_users (id, name, username, role, status)
values (
  'GANTI-DENGAN-USER-UID',
  'Administrator',
  'admin',
  'Admin',
  'Aktif'
);
```

Ganti `GANTI-DENGAN-USER-UID` dengan UID Admin Anda.

> Email internal `@users.sandikale.local` hanya dipakai sebagai identitas Auth. Di aplikasi, user tetap login menggunakan **username + password**.

## C. Hubungkan website ke Supabase

Buka file:

`css/js/supabase-config.js`

Isi:

```js
window.SANDIKALE_SUPABASE_URL = 'https://PROJECT_ID.supabase.co';
window.SANDIKALE_SUPABASE_KEY = 'PUBLISHABLE_OR_ANON_KEY';
```

Ambil kedua nilai tersebut dari **Project Settings → API**.

**Jangan masukkan `service_role` key ke file website.**

## D. Deploy Edge Function

Function ada di:

`supabase/functions/user-admin/index.ts`

Dengan Supabase CLI:

```bash
supabase login
supabase link --project-ref PROJECT_ID
supabase functions deploy user-admin
```

Function memakai `SUPABASE_SERVICE_ROLE_KEY` hanya di server Edge Function. Browser tidak pernah menerima key tersebut.

## E. Tes

Setelah deploy:

1. Upload/push project ke hosting/GitHub seperti biasa.
2. Buka website di laptop.
3. Login dengan `admin` dan password Admin yang dibuat di Supabase.
4. Buka **Manajemen User**.
5. Buat user Kasir, misalnya:
   - Nama: Kasir Toko
   - Username: kasir01
   - Password: minimal 6 karakter
   - Role: Kasir
   - Status: Aktif
6. Buka link website yang sama di HP.
7. Login menggunakan `kasir01`.

## F. Hak akses

### Admin
- Dashboard ✅
- Kasir ✅
- Produk ✅
- Kategori ✅
- Customer ✅
- Laporan ✅
- Manajemen User ✅

### Kasir
- Dashboard ✅
- Kasir ✅
- Produk ❌
- Kategori ❌
- Customer ❌
- Laporan ❌
- Manajemen User ❌

Akses Kasir tidak hanya disembunyikan dari sidebar. Fungsi admin juga melakukan pemeriksaan role sehingga Kasir ditolak jika mencoba menjalankan fungsi admin secara langsung.

## Catatan penting

Data **user/login** sudah cloud. Data produk, customer, kategori, dan transaksi pada project ini masih mengikuti penyimpanan aplikasi yang sudah ada. Jika Guru ingin semua perangkat melihat data produk/customer/transaksi yang sama secara real-time, tahap berikutnya adalah memindahkan tabel-tabel tersebut ke Supabase juga.
